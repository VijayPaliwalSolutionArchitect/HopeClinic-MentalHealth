import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, MessageSquare, User, Settings } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  const patientLinks = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Appointments', path: '/dashboard/appointments' },
    { icon: MessageSquare, label: 'AI Chat', path: '/dashboard/ai-chat' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
  ];

  const adminLinks = [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: Calendar, label: 'Appointments', path: '/admin/appointments' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const links = user?.role === 'ADMIN' ? adminLinks : patientLinks;

  return (
    <aside className="hidden lg:block fixed left-0 top-[73px] w-64 h-[calc(100vh-73px)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <nav className="p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;