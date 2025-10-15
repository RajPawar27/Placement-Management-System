import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar';
import { api } from '../../utils/api';

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
      const response = await api.get('/student/dashboard');
      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.full_name || 'Student'}!
            </h1>
            <p className="text-gray-600">Here's your placement journey overview</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Applications</h3>
              <p className="text-3xl font-bold text-blue-600">{dashboardData?.applications ?? 0}</p>
              <p className="text-sm text-gray-500">Total applications submitted</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interviews</h3>
              <p className="text-3xl font-bold text-emerald-600">{dashboardData?.interviews ?? 0}</p>
              <p className="text-sm text-gray-500">Scheduled interviews</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Offers</h3>
              <p className="text-3xl font-bold text-amber-600">{dashboardData?.offers ?? 0}</p>
              <p className="text-sm text-gray-500">Job offers received</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
              {dashboardData?.recentApplications?.length > 0 ? (
                dashboardData.recentApplications.map(app => (
                  <div key={app.id} className="mb-2">
                    <div className="font-medium text-gray-900">{app.jobTitle}</div>
                    <div className="text-sm text-gray-500">{app.companyName}</div>
                    <div className="text-xs text-gray-400">Status: {app.status}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No applications yet. Start exploring job opportunities!</p>
              )}
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Drives</h3>
              {dashboardData?.upcomingDrives?.length > 0 ? (
                dashboardData.upcomingDrives.map(drive => (
                  <div key={drive.id} className="mb-2">
                    <div className="font-medium text-gray-900">{drive.companyName}</div>
                    <div className="text-sm text-gray-500">{drive.date}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No upcoming placement drives.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;