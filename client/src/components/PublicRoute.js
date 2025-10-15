import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  // If user is authenticated, redirect to appropriate dashboard
  if (isAuthenticated && user) {
    const redirectPath = user.type === 'admin' ? '/admin/dashboard' : '/student/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PublicRoute;