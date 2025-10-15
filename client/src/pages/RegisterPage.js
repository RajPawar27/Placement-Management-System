import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    roll_no: '',
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    branch: 'Computer Engineering',
    class: 'BE',
    division: '',
    marks_10th: '',
    marks_12th: '',
    current_cgpa: '',
    active_backlog: false
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const branches = [
    'Computer Engineering',
    'IT Engineering', 
    'ENTC Engineering',
    'AIDS',
    'Electronics and Computer Engineering'
  ];

  const classes = ['FE', 'SE', 'TE', 'BE'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Remove confirmPassword before sending
      const { confirmPassword, ...registrationData } = formData;
      
      // Convert numeric fields
      registrationData.marks_10th = parseFloat(registrationData.marks_10th);
      registrationData.marks_12th = parseFloat(registrationData.marks_12th);
      registrationData.current_cgpa = parseFloat(registrationData.current_cgpa);

      const result = await register(registrationData);
      
      if (result.success) {
        toast.success('Registration successful! Please login with your credentials.');
        navigate('/login');
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Create Student Account
          </h2>
          <p className="mt-2 text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    className="input-field bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    name="roll_no"
                    required
                    value={formData.roll_no}
                    onChange={handleChange}
                    className="input-field bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="TECOA123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="john@student.pict.edu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="9876543210"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Academic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Branch *
                  </label>
                  <select
                    name="branch"
                    required
                    value={formData.branch}
                    onChange={handleChange}
                    className="input-field bg-white/10 border-white/20 text-white"
                  >
                    {branches.map(branch => (
                      <option key={branch} value={branch} className="bg-gray-800">
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Class *
                  </label>
                  <select
                    name="class"
                    required
                    value={formData.class}
                    onChange={handleChange}
                    className="input-field bg-white/10 border-white/20 text-white"
                  >
                    {classes.map(cls => (
                      <option key={cls} value={cls} className="bg-gray-800">
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Division
                  </label>
                  <input
                    type="text"
                    name="division"
                    value={formData.division}
                    onChange={handleChange}
                    className="input-field bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="A"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Current CGPA *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    name="current_cgpa"
                    required
                    value={formData.current_cgpa}
                    onChange={handleChange}
                    className="input-field bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="8.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    10th Marks (%) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    name="marks_10th"
                    required
                    value={formData.marks_10th}
                    onChange={handleChange}
                    className="input-field bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="90.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    12th Marks (%) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    name="marks_12th"
                    required
                    value={formData.marks_12th}
                    onChange={handleChange}
                    className="input-field bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="85.7"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="active_backlog"
                    checked={formData.active_backlog}
                    onChange={handleChange}
                    className="rounded border-white/20 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-white">I have active backlogs</span>
                </label>
              </div>
            </div>

            {/* Password */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="Minimum 6 characters"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="Re-enter password"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <div className="spinner mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-400 hover:text-white">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;