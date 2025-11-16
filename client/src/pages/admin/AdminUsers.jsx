import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data.data);
    } catch (error) {}
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Users</h1>
      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</div>
                <div><h3 className="font-bold text-lg">{user.firstName} {user.lastName}</h3><p className="text-sm text-gray-600 dark:text-gray-400">{user.email} • {user.phone}</p></div>
              </div>
              <Badge variant={user.isActive ? 'success' : 'danger'}>{user.role}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;