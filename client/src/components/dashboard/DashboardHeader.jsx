import React from 'react';
import { useAuthStore } from '../../store/authStore';

const DashboardHeader = () => {
  const { user } = useAuthStore();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Welcome, {user?.firstName || 'User'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;