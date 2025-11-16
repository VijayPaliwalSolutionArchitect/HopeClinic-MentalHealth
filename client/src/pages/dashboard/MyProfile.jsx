import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, MapPin, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import { useAuthStore } from '../../store/authStore';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const MyProfile = () => {
  const { user, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    email: user?.email || ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put('/auth/profile', formData);
      updateUser(response.data.data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account information</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{user?.firstName} {user?.lastName}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">{user?.email}</p>
          <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">{user?.role}</span>
        </Card>

        <Card className="lg:col-span-2 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} icon={User} />
              <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} icon={Mail} disabled />
            <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} icon={Phone} />
            <Button type="submit" loading={loading}><Save className="mr-2 w-5 h-5" />Save Changes</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default MyProfile;