import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import toast from 'react-hot-toast';
import Navbar from '../../components/layout/Navbar';
import {
  BuildingOfficeIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  BriefcaseIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const CompaniesPage = () => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await api.get('/companies');
      
      if (response.data.success) {
        setCompanies(response.data.companies);
      } else {
        toast.error('Failed to fetch companies data');
      }
    } catch (error) {
      console.error('Fetch companies error:', error);
      toast.error('Failed to fetch companies data');
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.company_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCompanyTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'startup':
        return 'bg-green-100 text-green-800';
      case 'mnc':
        return 'bg-blue-100 text-blue-800';
      case 'product':
        return 'bg-purple-100 text-purple-800';
      case 'service':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
                <h1 className="text-3xl font-bold text-gray-900">Companies Management</h1>
                <p className="text-gray-600">Manage partner companies and recruitment relationships</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add New Company
              </button>
            </div>
          </div>

          {/* Search and Stats */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <BuildingOfficeIcon className="w-4 h-4 mr-1" />
                  <span>Total: {companies.length} companies</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 mr-1 text-green-500" />
                  <span>Active: {companies.filter(c => c.status === 'active').length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <div key={company.company_id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Company Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        {company.logo_path ? (
                          <img
                            src={company.logo_path}
                            alt={company.company_name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                            <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {company.company_name}
                        </h3>
                        <p className="text-sm text-gray-500">{company.industry}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(company.status)}`}>
                      {company.status}
                    </span>
                  </div>

                  {/* Company Details */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <BriefcaseIcon className="w-4 h-4 mr-2" />
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCompanyTypeColor(company.company_type)}`}>
                        {company.company_type}
                      </span>
                    </div>

                    {company.website && (
                      <div className="flex items-center text-sm text-gray-600">
                        <GlobeAltIcon className="w-4 h-4 mr-2" />
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 truncate"
                        >
                          {company.website}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCompanies.length === 0 && (
            <div className="bg-white rounded-lg shadow">
              <div className="text-center py-12">
                <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No companies found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm
                    ? 'Try adjusting your search criteria.'
                    : 'No companies have been registered yet.'}
                </p>
                {!searchTerm && (
                  <div className="mt-6">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Add First Company
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          {companies.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {companies.filter(c => c.company_type === 'MNC').length}
                  </div>
                  <div className="text-sm text-gray-500">MNC Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {companies.filter(c => c.company_type === 'Startup').length}
                  </div>
                  <div className="text-sm text-gray-500">Startups</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {companies.filter(c => c.company_type === 'Product').length}
                  </div>
                  <div className="text-sm text-gray-500">Product Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {companies.filter(c => c.company_type === 'Service').length}
                  </div>
                  <div className="text-sm text-gray-500">Service Companies</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CompaniesPage;