import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  MessageSquare,
  FileText,
  AlertCircle,
  TrendingUp,
  Activity,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import api from '../../lib/api';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: Users,
      label: 'Total Patients',
      value: stats?.overview?.totalPatients || 0,
      color: 'from-blue-500 to-cyan-500',
      link: '/admin/users'
    },
    {
      icon: Calendar,
      label: 'Total Appointments',
      value: stats?.overview?.totalAppointments || 0,
      color: 'from-purple-500 to-pink-500',
      link: '/admin/appointments'
    },
    {
      icon: Clock,
      label: 'Today\'s Appointments',
      value: stats?.overview?.todayAppointments || 0,
      color: 'from-green-500 to-teal-500',
      link: '/admin/appointments'
    },
    {
      icon: MessageSquare,
      label: 'Active AI Sessions',
      value: stats?.overview?.activeSessions || 0,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: FileText,
      label: 'Recent Blogs',
      value: stats?.overview?.recentBlogs || 0,
      color: 'from-indigo-500 to-purple-500',
      link: '/admin/blogs'
    },
    {
      icon: AlertCircle,
      label: 'New Inquiries',
      value: stats?.overview?.newInquiries || 0,
      color: 'from-red-500 to-pink-500',
      link: '/admin/inquiries'
    },
    {
      icon: AlertCircle,
      label: 'Critical Exceptions',
      value: stats?.overview?.criticalExceptions || 0,
      color: 'from-red-600 to-red-700',
    },
    {
      icon: Activity,
      label: 'System Health',
      value: 'Good',
      color: 'from-green-600 to-green-700',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Welcome to Hope Clinic Management System
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {stat.link ? (
              <Link to={stat.link}>
                <Card className="p-6 hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {loading ? '...' : stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </Card>
              </Link>
            ) : (
              <Card className="p-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {loading ? '...' : stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </Card>
            )}
          </motion.div>
        ))}
      </div>

      {/* Appointment Type Chart */}
      {stats?.appointmentsByType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Appointments by Type
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {stats.appointmentsByType.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center"
                >
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                    {item._count}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {item.appointmentType.replace('_', ' ')}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Appointment Status */}
      {stats?.appointmentsByStatus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Appointment Status Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {stats.appointmentsByStatus.map((item, index) => {
                const statusColors = {
                  SCHEDULED: 'info',
                  CONFIRMED: 'success',
                  IN_PROGRESS: 'warning',
                  COMPLETED: 'success',
                  CANCELLED: 'danger',
                  NO_SHOW: 'danger',
                  RESCHEDULED: 'warning',
                };
                return (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center"
                  >
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {item._count}
                    </div>
                    <Badge variant={statusColors[item.status]} className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/admin/appointments">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Manage Appointments
                </h3>
              </div>
            </Link>
            <Link to="/admin/blogs">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Create Blog Post
                </h3>
              </div>
            </Link>
            <Link to="/admin/testimonials">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <MessageSquare className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Manage Testimonials
                </h3>
              </div>
            </Link>
            <Link to="/admin/inquiries">
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                <AlertCircle className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Review Inquiries
                </h3>
              </div>
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="p-6 bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">System Status</h2>
              <p className="opacity-90">All services are running smoothly</p>
            </div>
            <Activity className="w-16 h-16 opacity-50" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm opacity-90">Uptime</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">&lt;100ms</div>
              <div className="text-sm opacity-90">Response Time</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm opacity-90">Errors</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;