import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Activity, Clock, ArrowRight, Bell } from 'lucide-react';
import { format } from 'date-fns';
import api from '../../lib/api';
import { useAuthStore } from '../../store/authStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const PatientDashboard = () => {
  const { user } = useAuthStore();
  const [dashboard Data, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard/patient');
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      SCHEDULED: 'info',
      CONFIRMED: 'success',
      COMPLETED: 'success',
      CANCELLED: 'danger',
    };
    return colors[status] || 'primary';
  };

  const stats = [
    {
      icon: Calendar,
      label: 'Upcoming Appointments',
      value: dashboardData?.upcomingAppointments?.length || 0,
      color: 'from-blue-500 to-cyan-500',
      link: '/dashboard/appointments'
    },
    {
      icon: MessageSquare,
      label: 'AI Chat Sessions',
      value: dashboardData?.recentSessions?.length || 0,
      color: 'from-purple-500 to-pink-500',
      link: '/dashboard/ai-chat'
    },
    {
      icon: Activity,
      label: 'Total Sessions',
      value: dashboardData?.recentSessions?.filter(s => s.status === 'COMPLETED').length || 0,
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: Bell,
      label: 'Notifications',
      value: dashboardData?.notifications?.length || 0,
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Here's your mental wellness overview
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {stat.link ? (
              <Link to={stat.link}>
                <Card className="p-6 hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
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
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </Card>
            )}
          </motion.div>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Upcoming Appointments
            </h2>
            <Link to="/dashboard/appointments">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-20 rounded-lg"></div>
              ))}
            </div>
          ) : dashboardData?.upcomingAppointments?.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No upcoming appointments
              </p>
              <Link to="/book-appointment">
                <Button>Book Appointment</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {dashboardData?.upcomingAppointments?.slice(0, 3).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {appointment.appointmentType.replace('_', ' ')}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>
                          {format(new Date(appointment.appointmentDate), 'MMM d, yyyy')} at {appointment.startTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    {appointment.isOnline && appointment.meetingUrl && (
                      <a href={appointment.meetingUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm">Join</Button>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      {/* Recent AI Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent AI Chat Sessions
            </h2>
            <Link to="/dashboard/ai-chat">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-16 rounded-lg"></div>
              ))}
            </div>
          ) : dashboardData?.recentSessions?.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No chat sessions yet
              </p>
              <Link to="/dashboard/ai-chat">
                <Button>Start AI Chat</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {dashboardData?.recentSessions?.slice(0, 5).map((session) => (
                <Link key={session.id} to="/dashboard/ai-chat">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                          {session.sessionType.replace('_', ' ')}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {format(new Date(session.startedAt), 'MMM d, yyyy')} • {session._count?.messages || 0} messages
                        </p>
                      </div>
                    </div>
                    <Badge variant={session.status === 'ACTIVE' ? 'success' : 'info'} className="text-xs">
                      {session.status}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <h2 className="text-2xl font-bold mb-4">Need Support Right Now?</h2>
          <p className="mb-6 opacity-90">
            Connect with our AI assistant for immediate guidance or book a session with Dr. Bharat
          </p>
          <div className="flex gap-4">
            <Link to="/dashboard/ai-chat">
              <Button className="bg-white text-primary-600 hover:bg-gray-100">
                Start AI Chat
              </Button>
            </Link>
            <Link to="/book-appointment">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Book Appointment
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default PatientDashboard;