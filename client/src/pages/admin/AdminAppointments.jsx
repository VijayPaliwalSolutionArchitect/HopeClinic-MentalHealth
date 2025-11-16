import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, MapPin, CheckCircle, X, Mail } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  useEffect(() => { fetchAppointments(); }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments');
      setAppointments(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setProcessing(id);
    try {
      await api.put(`/appointments/${id}`, { status: 'CONFIRMED' });
      toast.success('Appointment confirmed! Email sent to patient.');
      fetchAppointments();
    } catch (error) {
      toast.error('Failed to approve');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id) => {
    setProcessing(id);
    try {
      await api.patch(`/appointments/${id}/cancel`, { cancelReason: 'Cancelled by admin' });
      toast.success('Appointment cancelled');
      fetchAppointments();
    } catch (error) {
      toast.error('Failed to cancel');
    } finally {
      setProcessing(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = { SCHEDULED: 'warning', CONFIRMED: 'success', COMPLETED: 'success', CANCELLED: 'danger' };
    return colors[status] || 'info';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Manage Appointments</h1><p className="text-gray-600 dark:text-gray-400">Review and manage all appointments</p></div></div>

      {loading ? (
        <div className="grid gap-4">{[...Array(3)].map((_, i) => (<Card key={i} className="p-6 animate-pulse"><div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div></Card>))}</div>
      ) : appointments.length === 0 ? (
        <Card className="p-12 text-center"><Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" /><p className="text-gray-600 dark:text-gray-400">No appointments yet</p></Card>
      ) : (
        <div className="grid gap-6">
          {appointments.map((apt) => (
            <Card key={apt.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${apt.isOnline ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>{apt.isOnline ? <Video className="w-7 h-7 text-blue-600" /> : <MapPin className="w-7 h-7 text-green-600" />}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{apt.appointmentType.replace(/_/g, ' ')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Patient: {apt.patient.firstName} {apt.patient.lastName}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400"><div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>{format(new Date(apt.appointmentDate), 'MMM d, yyyy')}</span></div><div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{apt.startTime}</span></div></div>
                    <div className="flex gap-2 mt-2"><Badge variant={getStatusColor(apt.status)}>{apt.status}</Badge><Badge variant="info">{apt.isOnline ? 'Online' : 'In-Person'}</Badge></div>
                  </div>
                </div>
                
                {apt.status === 'SCHEDULED' && (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleApprove(apt.id)} loading={processing === apt.id} disabled={processing === apt.id}><CheckCircle className="mr-2 w-4 h-4" />Approve</Button>
                    <Button size="sm" variant="danger" onClick={() => handleReject(apt.id)} disabled={processing === apt.id}><X className="mr-2 w-4 h-4" />Reject</Button>
                  </div>
                )}
              </div>
              
              {apt.reasonForVisit && (<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"><h4 className="text-sm font-semibold mb-2">Reason:</h4><p className="text-sm text-gray-600 dark:text-gray-400">{apt.reasonForVisit}</p></div>)}
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm"><div><Mail className="inline w-4 h-4 mr-2" />{apt.patient.email}</div><div>{apt.patient.phone}</div></div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;