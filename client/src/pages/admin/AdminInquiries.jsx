import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle, X } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Textarea from '../../components/ui/Textarea';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => { fetchInquiries(); }, []);

  const fetchInquiries = async () => {
    try {
      const response = await api.get('/inquiries');
      setInquiries(response.data.data);
    } catch (error) {}
    finally { setLoading(false); }
  };

  const handleReply = async (id) => {
    try {
      await api.patch(`/inquiries/${id}/respond`, { response: replyText });
      toast.success('Reply sent!');
      setReplyingTo(null);
      setReplyText('');
      fetchInquiries();
    } catch (error) {
      toast.error('Failed to send reply');
    }
  };

  const handleIgnore = async (id) => {
    try {
      await api.patch(`/inquiries/${id}/status`, { status: 'IGNORED' });
      toast.success('Inquiry ignored');
      fetchInquiries();
    } catch (error) {}
  };

  const getStatusColor = (status) => {
    const colors = { NEW: 'warning', REPLIED: 'success', IGNORED: 'danger' };
    return colors[status] || 'info';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Inquiries</h1>

      <div className="grid gap-4">
        {inquiries.map((inq) => (
          <Card key={inq.id} className="p-6">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{inq.subject}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">From: {inq.name} ({inq.email})</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{inq.message}</p>
                <p className="text-xs text-gray-500">{format(new Date(inq.createdAt), 'MMM d, yyyy HH:mm')}</p>
              </div>
              <Badge variant={getStatusColor(inq.status)}>{inq.status}</Badge>
            </div>
            
            {replyingTo === inq.id ? (
              <div className="space-y-3 pt-4 border-t">
                <Textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={4} placeholder="Type your reply..." />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleReply(inq.id)}><Send className="mr-2 w-4 h-4" />Send Reply</Button>
                  <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>Cancel</Button>
                </div>
              </div>
            ) : inq.status === 'NEW' ? (
              <div className="flex gap-2 pt-4 border-t">
                <Button size="sm" onClick={() => setReplyingTo(inq.id)}><Mail className="mr-2 w-4 h-4" />Reply</Button>
                <Button size="sm" variant="danger" onClick={() => handleIgnore(inq.id)}>Ignore</Button>
              </div>
            ) : inq.response && (
              <div className="pt-4 border-t"><h4 className="font-semibold mb-2">Reply:</h4><p className="text-sm text-gray-600 dark:text-gray-400">{inq.response}</p></div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminInquiries;