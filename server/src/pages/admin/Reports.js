import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import toast from 'react-hot-toast';
import Navbar from '../../components/layout/Navbar';
import {
  ChartBarIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
  BriefcaseIcon,
  TrophyIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const ReportsPage = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState('placement-overview');
  const [reportFilters, setReportFilters] = useState({
    academic_year: '2024-25',
    branch: '',
    report_type: 'placement-overview'
  });

  const reportTypes = [
    { value: 'placement-overview', label: 'Placement Overview', icon: TrophyIcon },
    { value: 'branch-wise', label: 'Branch-wise Analysis', icon: ChartBarIcon },
    { value: 'company-wise', label: 'Company Performance', icon: BriefcaseIcon },
    { value: 'salary-analysis', label: 'Salary Analysis', icon: DocumentChartBarIcon },
  ];

  const branches = ['Computer Engineering', 'Information Technology', 'Electronics & Communication', 'Mechanical Engineering', 'Civil Engineering'];
  const academicYears = ['2024-25', '2023-24', '2022-23', '2021-22'];

  useEffect(() => {
    fetchReportsData();
  }, [reportFilters]);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/dashboard');
      
      if (response.data.success) {
        setDashboardData(response.data.stats);
      } else {
        toast.error('Failed to fetch reports data');
      }
    } catch (error) {
      console.error('Fetch reports error:', error);
      toast.error('Failed to fetch reports data');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setReportFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReportTypeChange = (reportType) => {
    setSelectedReport(reportType);
    setReportFilters(prev => ({
      ...prev,
      report_type: reportType
    }));
  };

  const downloadReport = (format) => {
    toast.success(`Downloading ${format.toUpperCase()} report...`);
    // Implementation for actual download would go here
  };

  const PlacementOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Students</p>
              <p className="text-3xl font-bold">{dashboardData?.total_students || 0}</p>
            </div>
            <UserGroupIcon className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Students Placed</p>
              <p className="text-3xl font-bold">{dashboardData?.placed_students || 0}</p>
            </div>
            <TrophyIcon className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Placement Rate</p>
              <p className="text-3xl font-bold">{dashboardData?.placement_percentage || 0}%</p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Active Companies</p>
              <p className="text-3xl font-bold">{dashboardData?.total_companies || 0}</p>
            </div>
            <BriefcaseIcon className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Applications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData?.recent_applications?.slice(0, 10).map((application) => (
                <tr key={application.application_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {application.student_name}
                      </div>
                      <div className="text-sm text-gray-500">{application.roll_no}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.company_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.job_title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      application.status === 'selected' ? 'bg-green-100 text-green-800' :
                      application.status === 'shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(application.application_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const BranchWiseReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Branch-wise Placement Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <div key={branch} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">{branch}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Students:</span>
                  <span className="font-medium">120</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Placed:</span>
                  <span className="font-medium text-green-600">85</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Placement Rate:</span>
                  <span className="font-medium text-blue-600">70.8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg Package:</span>
                  <span className="font-medium text-purple-600">₹8.5 LPA</span>
                </div>
              </div>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '70.8%'}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CompanyWiseReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Recruiting Companies</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students Hired
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { company: 'TCS', hired: 45, package: '₹4.5 LPA', type: 'Full-time' },
                { company: 'Infosys', hired: 38, package: '₹5.2 LPA', type: 'Full-time' },
                { company: 'Wipro', hired: 25, package: '₹4.8 LPA', type: 'Full-time' },
                { company: 'Cognizant', hired: 22, package: '₹5.5 LPA', type: 'Full-time' },
                { company: 'Tech Mahindra', hired: 18, package: '₹4.2 LPA', type: 'Full-time' }
              ].map((company, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {company.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.hired}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.package}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SalaryAnalysisReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Salary Distribution</h3>
          <div className="space-y-4">
            {[
              { range: '₹3-5 LPA', count: 120, percentage: 40 },
              { range: '₹5-8 LPA', count: 85, percentage: 28 },
              { range: '₹8-12 LPA', count: 60, percentage: 20 },
              { range: '₹12-20 LPA', count: 25, percentage: 8 },
              { range: '₹20+ LPA', count: 12, percentage: 4 }
            ].map((salary, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                  <span className="text-sm font-medium">{salary.range}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">{salary.count} students</span>
                  <span className="text-sm font-medium">{salary.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Package Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Highest Package</span>
              <span className="text-lg font-bold text-green-600">₹45 LPA</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Average Package</span>
              <span className="text-lg font-bold text-blue-600">₹8.5 LPA</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Median Package</span>
              <span className="text-lg font-bold text-purple-600">₹6.5 LPA</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-sm text-gray-600">Lowest Package</span>
              <span className="text-lg font-bold text-orange-600">₹3.5 LPA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'placement-overview':
        return <PlacementOverviewReport />;
      case 'branch-wise':
        return <BranchWiseReport />;
      case 'company-wise':
        return <CompanyWiseReport />;
      case 'salary-analysis':
        return <SalaryAnalysisReport />;
      default:
        return <PlacementOverviewReport />;
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
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Placement Reports</h1>
                <p className="text-gray-600">Comprehensive placement analytics and insights</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => downloadReport('pdf')}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  PDF
                </button>
                <button
                  onClick={() => downloadReport('excel')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Excel
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year
                </label>
                <select
                  value={reportFilters.academic_year}
                  onChange={(e) => handleFilterChange('academic_year', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {academicYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch
                </label>
                <select
                  value={reportFilters.branch}
                  onChange={(e) => handleFilterChange('branch', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Branches</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Type
                </label>
                <select
                  value={selectedReport}
                  onChange={(e) => handleReportTypeChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {reportTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Report Type Tabs */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                {reportTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => handleReportTypeChange(type.value)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                        selectedReport === type.value
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {type.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Report Content */}
          {renderReportContent()}
        </div>
      </div>
    </>
  );
};

export default ReportsPage;