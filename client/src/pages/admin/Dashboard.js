import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user?.full_name || 'Administrator'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Students</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500">Active registrations</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Companies</h3>
            <p className="text-3xl font-bold text-emerald-600">0</p>
            <p className="text-sm text-gray-500">Partner companies</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Jobs</h3>
            <p className="text-3xl font-bold text-amber-600">0</p>
            <p className="text-sm text-gray-500">Open positions</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Placements</h3>
            <p className="text-3xl font-bold text-purple-600">0%</p>
            <p className="text-sm text-gray-500">Placement rate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
            <p className="text-gray-500">No recent applications.</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="btn-primary w-full">Add New Company</button>
              <button className="btn-outline w-full">Create Job Posting</button>
              <button className="btn-outline w-full">View Reports</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;