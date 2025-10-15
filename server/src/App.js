import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import components
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

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
import Students from './pages/admin/Students';
import Companies from './pages/admin/Companies';
import Jobs from './pages/admin/Jobs';
import Reports from './pages/admin/Reports';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
              <Companies />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/jobs" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Jobs />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/students" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Students />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/reports" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Reports />
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