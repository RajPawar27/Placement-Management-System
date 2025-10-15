import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import toast from 'react-hot-toast';
import Navbar from '../../components/layout/Navbar';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/dashboard');
      
      if (response.data.success) {
        setDashboardData(response.data.stats);
      } else {
        toast.error('Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Dashboard error:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {user?.full_name || 'Administrator'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Students</h3>
            <p className="text-3xl font-bold text-blue-600">
              {dashboardData?.total_students || 0}
            </p>
            <p className="text-sm text-gray-500">Active registrations</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Companies</h3>
            <p className="text-3xl font-bold text-emerald-600">
              {dashboardData?.total_companies || 0}
            </p>
            <p className="text-sm text-gray-500">Partner companies</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Jobs</h3>
            <p className="text-3xl font-bold text-amber-600">
              {dashboardData?.active_jobs || 0}
            </p>
            <p className="text-sm text-gray-500">Open positions</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Placements</h3>
            <p className="text-3xl font-bold text-purple-600">
              {dashboardData?.placement_percentage || 0}%
            </p>
            <p className="text-sm text-gray-500">Placement rate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
            {dashboardData?.recent_applications?.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.recent_applications.slice(0, 5).map((application) => (
                  <div key={application.application_id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {application.student_name} ({application.roll_no})
                      </p>
                      <p className="text-xs text-gray-500">
                        {application.job_title} at {application.company_name}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      application.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                      application.status === 'shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'selected' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {application.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent applications.</p>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={() => window.location.href = '/admin/companies'}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add New Company
              </button>
              <button 
                onClick={() => window.location.href = '/admin/jobs'}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Create Job Posting
              </button>
              <button 
                onClick={() => window.location.href = '/admin/reports'}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                View Reports
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;