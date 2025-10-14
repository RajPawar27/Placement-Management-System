import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import JobListings from './pages/student/JobListings';
import JobDetails from './pages/student/JobDetails';
import Applications from './pages/student/Applications';
import AdminDashboard from './pages/admin/Dashboard';
import CompanyManagement from './pages/admin/CompanyManagement';
import JobManagement from './pages/admin/JobManagement';
import StudentManagement from './pages/admin/StudentManagement';
import PlacementReports from './pages/admin/Reports';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.type)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }
  
  if (user) {
    // Redirect based on user type
    if (user.type === 'student') {
      return <Navigate to="/student/dashboard" replace />;
    } else if (user.type === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }
  
  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />
        
        {/* Student Routes */}
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/profile" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/jobs" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <JobListings />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/jobs/:id" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <JobDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/applications" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Applications />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/companies" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CompanyManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/jobs" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <JobManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/students" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <StudentManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/reports" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PlacementReports />
            </ProtectedRoute>
          } 
        />
        
        {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-4">Page not found</p>
                <a href="/" className="btn-primary">
                  Go Home
                </a>
              </div>
            </div>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;