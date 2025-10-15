import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = Cookies.get('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        
        // Verify token is still valid by making a test request
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        try {
          // Test token validity with a simple request
          await api.get('/auth/verify');
          
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          // Token is invalid, clear auth data
          clearAuthData();
        }
      } else {
        clearAuthData();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const clearAuthData = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  const login = async (email, password, userType) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', {
        email,
        password,
        user_type: userType
      });

      if (response.data.success) {
        const { token, user: userData } = response.data;
        
        // Store token and user data
        Cookies.set('token', token, { expires: 7, secure: false, sameSite: 'lax' });
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Set token in API headers
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setUser(userData);
        setIsAuthenticated(true);
        
        toast.success(`Welcome back, ${userData.full_name}!`);
        
        return { 
          success: true, 
          user: userData,
          redirectTo: userData.type === 'student' ? '/student/dashboard' : '/admin/dashboard'
        };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/register', formData);
      
      if (response.data.success) {
        toast.success('Registration successful! Please login.');
        return { success: true, message: 'Registration successful! Please login.' };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = (showMessage = true, redirectTo = '/') => {
    try {
      // Clear all authentication data
      clearAuthData();
      
      if (showMessage) {
        toast.success('Logged out successfully!');
      }
      
      // Redirect to login or home page
      window.location.href = redirectTo;
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is student
  const isStudent = () => {
    return user?.type === 'student';
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.type === 'admin';
  };

  // Get user's dashboard route
  const getDashboardRoute = () => {
    if (!user) return '/';
    return user.type === 'student' ? '/student/dashboard' : '/admin/dashboard';
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    hasRole,
    isStudent,
    isAdmin,
    getDashboardRoute,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};