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

  const handleCreate = () => {
    setEditingTestimonial(null);
    setFormData({
      name: '',
      location: '',
      program: '',
      rating: 5,
      message: '',
      isApproved: false,
      isFeatured: false
    });
    setShowModal(true);
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      location: testimonial.location,
      program: testimonial.program,
      rating: testimonial.rating,
      message: testimonial.message,
      isApproved: testimonial.isApproved,
      isFeatured: testimonial.isFeatured
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await api.put(`/testimonials/${editingTestimonial.id}`, formData);
        toast.success('Testimonial updated!');
      } else {
        await api.post('/testimonials', formData);
        toast.success('Testimonial created!');
      }
      setShowModal(false);
      fetchTestimonials();
    } catch (error) {
      toast.error('Operation failed');
    }
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Testimonials</h1>
        <Button onClick={handleCreate}><Plus className="mr-2 w-5 h-5" />Create New</Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((t) => (
            <Card key={t.id} className="p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.name}</h3>
                  <div className="flex mb-2">{[...Array(t.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />))}</div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{t.message}</p>
                  <p className="text-sm text-gray-500">{t.location} • {t.program}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={t.isApproved ? 'success' : 'warning'}>{t.isApproved ? 'Approved' : 'Pending'}</Badge>
                    {t.isFeatured && <Badge variant="info">Featured</Badge>}
                  </div>
                </div>
                <div className="flex gap-2">
                  {!t.isApproved && <Button size="sm" onClick={() => handleApprove(t.id)}><CheckCircle className="w-4 h-4" /></Button>}
                  <Button size="sm" variant="outline" onClick={() => handleEdit(t)}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(t.id)}><Trash className="w-4 h-4" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <Card className="max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6">{editingTestimonial ? 'Edit' : 'Create'} Testimonial</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <Input label="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
              <Input label="Program" value={formData.program} onChange={(e) => setFormData({...formData, program: e.target.value})} required />
              <Select label="Rating" value={formData.rating} onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})} options={[{value: 5, label: '5 Stars'}, {value: 4, label: '4 Stars'}, {value: 3, label: '3 Stars'}]} />
              <Textarea label="Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={5} required />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.isApproved} onChange={(e) => setFormData({...formData, isApproved: e.target.checked})} className="w-4 h-4" />
                  <span>Approved</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4" />
                  <span>Featured</span>
                </label>
              </div>
              <div className="flex gap-3">
                <Button type="submit">Save</Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;