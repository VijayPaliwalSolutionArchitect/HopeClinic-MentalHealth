import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, MapPin, X, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const fetchAppointments = async () => {
    try {
      const params = filter === 'upcoming' ? { upcoming: true } : {};
      const response = await api.get('/appointments/my-appointments', { params });
      setAppointments(response.data.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;

    setCancelling(appointmentId);
    try {
      await api.patch(`/appointments/${appointmentId}/cancel`, {
        cancelReason: 'Cancelled by patient'
      });
      toast.success('Appointment cancelled successfully');
      fetchAppointments();
    } catch (error) {
      toast.error('Failed to cancel appointment');
    } finally {
      setCancelling(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      SCHEDULED: 'info',
      CONFIRMED: 'success',
      IN_PROGRESS: 'warning',
      COMPLETED: 'success',
      CANCELLED: 'danger',
      NO_SHOW: 'danger',
    };
    return colors[status] || 'primary';
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'upcoming') {
      return ['SCHEDULED', 'CONFIRMED'].includes(apt.status);
    } else if (filter === 'past') {
      return ['COMPLETED', 'CANCELLED', 'NO_SHOW'].includes(apt.status);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Appointments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your upcoming and past appointments
          </p>
        </div>
        <Link to="/book-appointment">
          <Button>
            <Calendar className="mr-2 w-5 h-5" />
            Book New
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            filter === 'upcoming'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter('past')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            filter === 'past'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Past
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All
        </button>
      </div>

      {/* Appointments List */}
      {loading ? (
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </Card>
          ))}
        </div>
      ) : filteredAppointments.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No {filter} appointments
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {filter === 'upcoming'
                ? "You don't have any upcoming appointments"
                : "You don't have any past appointments"}
            </p>
            <Link to="/book-appointment">
              <Button>Book Your First Appointment</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                      appointment.isOnline
                        ? 'bg-blue-100 dark:bg-blue-900/30'
                        : 'bg-green-100 dark:bg-green-900/30'
                    }`}>
                      {appointment.isOnline ? (
                        <Video className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <MapPin className="w-7 h-7 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {appointment.appointmentType.replace(/_/g, ' ')}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(appointment.appointmentDate), 'EEEE, MMMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.startTime} - {appointment.endTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <Badge variant="info">
                          {appointment.isOnline ? 'Online' : 'In-Person'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {appointment.isOnline && appointment.meetingUrl && appointment.status === 'CONFIRMED' && (
                      <a href={appointment.meetingUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm">
                          <ExternalLink className="mr-2 w-4 h-4" />
                          Join Meeting
                        </Button>
                      </a>
                    )}
                    {['SCHEDULED', 'CONFIRMED'].includes(appointment.status) && (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleCancel(appointment.id)}
                        loading={cancelling === appointment.id}
                      >
                        <X className="mr-2 w-4 h-4" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>

                {appointment.reasonForVisit && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Reason for Visit:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {appointment.reasonForVisit}
                    </p>
                  </div>
                )}

                {appointment.notes && (
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Notes:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {appointment.notes}
                    </p>
                  </div>
                )}

                {appointment.isOnline && appointment.meetingPlatform && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Platform:</span> {appointment.meetingPlatform.replace('-', ' ').toUpperCase()}
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;