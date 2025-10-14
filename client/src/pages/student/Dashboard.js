import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
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
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500">Total applications submitted</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interviews</h3>
            <p className="text-3xl font-bold text-emerald-600">0</p>
            <p className="text-sm text-gray-500">Scheduled interviews</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Offers</h3>
            <p className="text-3xl font-bold text-amber-600">0</p>
            <p className="text-sm text-gray-500">Job offers received</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
            <p className="text-gray-500">No applications yet. Start exploring job opportunities!</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Drives</h3>
            <p className="text-gray-500">No upcoming placement drives.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;