import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const DashboardHeader = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Dashboard
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Welcome, <span className="font-semibold text-gray-900 dark:text-white">{user?.firstName || 'User'}</span>
          </span>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;