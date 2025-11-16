import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, X, Star, Edit, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Select from '../../components/ui/Select';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    program: '',
    rating: 5,
    message: '',
    isApproved: false,
    isFeatured: false
  });

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get('/testimonials', { params: { limit: 100 } });
      setTestimonials(response.data.data);
    } catch (error) {}
    finally { setLoading(false); }
  };

  const handleApprove = async (id) => {
    try {
      await api.patch(`/testimonials/${id}/approve`);
      toast.success('Testimonial approved!');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to approve');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      toast.success('Testimonial deleted');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-3xl font-bold">Manage Testimonials</h1></div>

      <div className="grid gap-4">
        {testimonials.map((t) => (
          <Card key={t.id} className="p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{t.name}</h3>
                <div className="flex mb-2">{[...Array(t.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />))}</div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{t.message}</p>
                <p className="text-sm text-gray-500">{t.location} • {t.program}</p>
              </div>
              <div className="flex gap-2">
                {!t.isApproved && <Button size="sm" onClick={() => handleApprove(t.id)}><CheckCircle className="w-4 h-4" /></Button>}
                <Button size="sm" variant="danger" onClick={() => handleDelete(t.id)}><X className="w-4 h-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;