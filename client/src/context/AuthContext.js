import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { api } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = Cookies.get('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        // Set token in API headers
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Auth check error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, userType) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        user_type: userType
      });

      if (response.data.success) {
        const { token, user: userData } = response.data;
        
        // Store token and user data
        Cookies.set('token', token, { expires: 7 }); // 7 days
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Set token in API headers
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setUser(userData);
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  };

  const register = async (formData) => {
    try {
      const response = await api.post('/auth/register', formData);
      
      if (response.data.success) {
        return { success: true, message: 'Registration successful! Please login.' };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, message };
    }
  };

  const logout = () => {
    // Clear token and user data
    Cookies.remove('token');
    localStorage.removeItem('user');
    
    // Remove token from API headers
    delete api.defaults.headers.common['Authorization'];
    
    setUser(null);
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isStudent: user?.type === 'student',
    isAdmin: user?.type === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};