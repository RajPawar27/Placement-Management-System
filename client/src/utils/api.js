import axios from 'axios';
import Cookies from 'js-cookie';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper functions for common API calls
export const authAPI = {
  login: (email, password, userType) => 
    api.post('/auth/login', { email, password, user_type: userType }),
  
  register: (data) => 
    api.post('/auth/register', data),
  
  forgotPassword: (email) => 
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token, newPassword) => 
    api.post('/auth/reset-password', { token, new_password: newPassword }),
};

export const studentAPI = {
  getProfile: () => 
    api.get('/students/profile'),
  
  updateProfile: (data) => 
    api.put('/students/profile', data),
  
  uploadResume: (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return api.post('/students/upload-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  getApplications: () => 
    api.get('/students/applications'),
};

export const jobAPI = {
  getJobs: (params = {}) => 
    api.get('/jobs', { params }),
  
  getJobById: (id) => 
    api.get(`/jobs/${id}`),
  
  applyForJob: (jobId) => 
    api.post(`/jobs/${jobId}/apply`),
};

export const companyAPI = {
  getCompanies: () => 
    api.get('/companies'),
  
  getCompanyById: (id) => 
    api.get(`/companies/${id}`),
};

export const adminAPI = {
  getDashboard: () => 
    api.get('/admin/dashboard'),
  
  getStudents: (params = {}) => 
    api.get('/admin/students', { params }),
  
  createCompany: (data) => 
    api.post('/admin/companies', data),
  
  createJob: (data) => 
    api.post('/admin/jobs', data),
  
  updateApplicationStatus: (applicationId, status, feedback = '') => 
    api.put(`/admin/applications/${applicationId}/status`, { status, feedback }),
};

export const notificationAPI = {
  getNotifications: () => 
    api.get('/notifications'),
  
  markAsRead: (notificationId) => 
    api.put(`/notifications/${notificationId}/read`),
};

export { api };