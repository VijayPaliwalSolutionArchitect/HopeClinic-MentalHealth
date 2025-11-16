import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Eye } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({ title: '', slug: '', excerpt: '', content: '', featuredImage: '' });

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/blogs', { params: { limit: 50 } });
      setBlogs(response.data.data);
    } catch (error) {}
    finally { setLoading(false); }
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setFormData({ title: '', slug: '', excerpt: '', content: '', featuredImage: '' });
    setShowModal(true);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, slug: blog.slug, excerpt: blog.excerpt, content: blog.content, featuredImage: blog.featuredImage });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await api.put(`/blogs/${editingBlog.id}`, formData);
        toast.success('Blog updated!');
      } else {
        await api.post('/blogs', formData);
        toast.success('Blog created!');
      }
      setShowModal(false);
      fetchBlogs();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      toast.success('Blog deleted');
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handlePublish = async (id) => {
    try {
      await api.patch(`/blogs/${id}/publish`);
      toast.success('Blog published!');
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to publish');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-3xl font-bold">Manage Blogs</h1><Button onClick={handleCreate}><Plus className="mr-2 w-5 h-5" />Create New</Button></div>

      {loading ? (<div>Loading...</div>) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id} className="p-6">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  {blog.featuredImage && <img src={blog.featuredImage} className="w-24 h-24 object-cover rounded-lg" />}
                  <div>
                    <h3 className="text-xl font-bold mb-1">{blog.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{blog.excerpt}</p>
                    <div className="flex gap-2"><Badge variant={blog.isPublished ? 'success' : 'warning'}>{blog.status}</Badge><span className="text-xs text-gray-500">{blog.views} views</span></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!blog.isPublished && <Button size="sm" onClick={() => handlePublish(blog.id)}>Publish</Button>}
                  <Button size="sm" variant="outline" onClick={() => handleEdit(blog)}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(blog.id)}><Trash className="w-4 h-4" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <Card className="max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6">{editingBlog ? 'Edit' : 'Create'} Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} required />
              <Input label="Slug" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required />
              <Textarea label="Excerpt" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} rows={3} required />
              <Textarea label="Content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={10} required />
              <Input label="Featured Image URL" value={formData.featuredImage} onChange={(e) => setFormData({...formData, featuredImage: e.target.value})} />
              <div className="flex gap-3"><Button type="submit">Save</Button><Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button></div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;