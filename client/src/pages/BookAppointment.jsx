import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Video, MapPin, User, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { format, addDays, startOfDay, isBefore } from 'date-fns';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';
import SEO from '../components/SEO';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import { APPOINTMENT_TYPES, MEETING_PLATFORMS } from '../lib/constants';

const BookAppointment = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [formData, setFormData] = useState({
    appointmentType: 'INITIAL_CONSULTATION',
    appointmentDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    startTime: '',
    isOnline: true,
    meetingPlatform: 'google-meet',
    reasonForVisit: '',
    notes: '',
    // For non-authenticated users
    name: user?.firstName + ' ' + user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.appointmentDate) {
      fetchAvailableSlots();
    }
  }, [formData.appointmentDate]);

  const fetchAvailableSlots = async () => {
    try {
      const response = await api.get('/appointments/available-slots', {
        params: { date: formData.appointmentDate }
      });
      setAvailableSlots(response.data.data || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.appointmentType) newErrors.appointmentType = 'Please select appointment type';
      if (!formData.isOnline && !formData.isOnline) newErrors.isOnline = 'Please select consultation mode';
    }
    
    if (step === 2) {
      if (!formData.appointmentDate) newErrors.appointmentDate = 'Please select a date';
      if (!formData.startTime) newErrors.startTime = 'Please select a time slot';
    }
    
    if (step === 3) {
      if (!isAuthenticated) {
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
      }
      if (!formData.reasonForVisit) newErrors.reasonForVisit = 'Please tell us why you are booking';
    }
    
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateStep();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateStep();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!isAuthenticated) {
      toast.error('Please login to book an appointment');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      await api.post('/appointments', formData);
      toast.success('Appointment booked successfully!');
      navigate('/dashboard/appointments');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const appointmentTypes = [
    { value: 'INITIAL_CONSULTATION', label: 'Initial Consultation' },
    { value: 'FOLLOW_UP', label: 'Follow-up Session' },
    { value: 'THERAPY_SESSION', label: 'Therapy Session' },
    { value: 'ASSESSMENT', label: 'Mental Health Assessment' },
  ];

  return (
    <>
      <SEO
        title="Book Appointment"
        description="Book your mental health consultation with Dr. Bharat Agarwal. Online and offline appointments available."
      />

      <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Book Your Appointment
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Schedule your session with Dr. Bharat Agarwal
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((s) => (
                  <React.Fragment key={s}>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        step >= s
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`w-16 h-1 ${
                          step > s ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <Card className="p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Type & Mode */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Select Appointment Details
                    </h2>

                    <Select
                      label="Appointment Type"
                      name="appointmentType"
                      value={formData.appointmentType}
                      onChange={handleChange}
                      error={errors.appointmentType}
                      options={appointmentTypes}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Consultation Mode
                      </label>
                      <div className="grid md:grid-cols-2 gap-4">
                        <label className={`cursor-pointer ${formData.isOnline ? 'ring-2 ring-primary-600' : ''}`}>
                          <Card className="p-6 text-center">
                            <Video className="w-12 h-12 mx-auto mb-3 text-primary-600" />
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                              Online
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Video consultation from anywhere
                            </p>
                            <input
                              type="radio"
                              name="isOnline"
                              checked={formData.isOnline}
                              onChange={() => setFormData(prev => ({ ...prev, isOnline: true }))}
                              className="mt-3"
                            />
                          </Card>
                        </label>
                        
                        <label className={`cursor-pointer ${!formData.isOnline ? 'ring-2 ring-primary-600' : ''}`}>
                          <Card className="p-6 text-center">
                            <MapPin className="w-12 h-12 mx-auto mb-3 text-primary-600" />
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                              In-Person
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Visit our clinic
                            </p>
                            <input
                              type="radio"
                              name="isOnline"
                              checked={!formData.isOnline}
                              onChange={() => setFormData(prev => ({ ...prev, isOnline: false }))}
                              className="mt-3"
                            />
                          </Card>
                        </label>
                      </div>
                    </div>

                    {formData.isOnline && (
                      <Select
                        label="Preferred Video Platform"
                        name="meetingPlatform"
                        value={formData.meetingPlatform}
                        onChange={handleChange}
                        options={MEETING_PLATFORMS}
                      />
                    )}
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Choose Date & Time
                    </h2>

                    <Input
                      label="Appointment Date"
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      error={errors.appointmentDate}
                      min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
                      icon={CalendarIcon}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Available Time Slots
                      </label>
                      {availableSlots.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                          No slots available for this date. Please select another date.
                        </p>
                      ) : (
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot.time}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, startTime: slot.time }))}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                formData.startTime === slot.time
                                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
                              }`}
                            >
                              <Clock className=\"w-4 h-4 mx-auto mb-1\" />
                              <div className="text-sm font-medium">{slot.time}</div>
                            </button>
                          ))}
                        </div>
                      )}
                      {errors.startTime && (
                        <p className="mt-2 text-sm text-red-500">{errors.startTime}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Contact Details & Reason
                    </h2>

                    {!isAuthenticated && (
                      <>
                        <Input
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          error={errors.name}
                          icon={User}
                          placeholder="John Doe"
                        />
                        <Input
                          label="Email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          error={errors.email}
                          icon={Mail}
                          placeholder="you@example.com"
                        />
                        <Input
                          label="Phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          error={errors.phone}
                          icon={Phone}
                          placeholder="+91 9876543210"
                        />
                      </>
                    )}

                    <Textarea
                      label="Reason for Visit"
                      name="reasonForVisit"
                      value={formData.reasonForVisit}
                      onChange={handleChange}
                      error={errors.reasonForVisit}
                      rows={4}
                      placeholder="Please briefly describe what brings you here..."
                    />

                    <Textarea
                      label="Additional Notes (Optional)"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any specific concerns or questions..."
                    />
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <Button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      variant="outline"
                    >
                      Previous
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className={step === 1 ? 'ml-auto' : ''}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" loading={loading} className="ml-auto">
                      Confirm Booking
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;