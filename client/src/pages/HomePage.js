import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBuilding, FaChartLine, FaBell, FaArrowRight } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-gray-900">
      {/* Navigation */}
      <nav className="relative z-20 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              PICT Placement System
            </h1>
            <div className="flex gap-4">
              <Link to="/login" className="btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn-outline text-white border-white hover:bg-white hover:text-gray-900">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 text-white py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Your Career Journey Starts Here
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Connecting PICT students with premier companies for successful career placements
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started <FaArrowRight />
            </Link>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/20 transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-16 text-white">
            Comprehensive Placement Management
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/20 hover:border-blue-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaGraduationCap className="text-3xl text-emerald-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-white">Student Profiles</h4>
              <p className="text-gray-300">Complete academic profiles with resume management and application tracking</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/20 hover:border-blue-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaBuilding className="text-3xl text-sky-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-white">Company Portal</h4>
              <p className="text-gray-300">Browse top companies and apply for positions that match your skills</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/20 hover:border-blue-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaChartLine className="text-3xl text-amber-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-white">TPO Dashboard</h4>
              <p className="text-gray-300">Advanced analytics and management tools for placement officers</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/20 hover:border-blue-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaBell className="text-3xl text-violet-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-white">Smart Notifications</h4>
              <p className="text-gray-300">Real-time updates on applications, deadlines, and placement drives</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <div className="text-4xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-white text-lg">Placement Rate</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <div className="text-4xl font-bold text-emerald-400 mb-2">200+</div>
              <div className="text-white text-lg">Partner Companies</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <div className="text-4xl font-bold text-amber-400 mb-2">1500+</div>
              <div className="text-white text-lg">Students Placed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2025 PICT Placement Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;