import React, { useState, useEffect } from 'react';
import { Save, Settings as SettingsIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const AdminSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/settings');
      setSettings(response.data.data);
    } catch (error) {}
    finally { setLoading(false); }
  };

  const handleSave = async (key, value) => {
    setSaving(true);
    try {
      await api.put(`/settings/${key}`, { value });
      toast.success('Setting updated!');
    } catch (error) {
      toast.error('Failed to update');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">General Settings</h2>
        <div className="space-y-4">
          <Input label="Clinic Name" value={settings.clinic_name || ''} onChange={(e) => setSettings({...settings, clinic_name: e.target.value})} onBlur={(e) => handleSave('clinic_name', e.target.value)} />
          <Input label="Clinic Phone" value={settings.clinic_phone || ''} onChange={(e) => setSettings({...settings, clinic_phone: e.target.value})} onBlur={(e) => handleSave('clinic_phone', e.target.value)} />
          <Input label="Clinic Email" value={settings.clinic_email || ''} onChange={(e) => setSettings({...settings, clinic_email: e.target.value})} onBlur={(e) => handleSave('clinic_email', e.target.value)} />
          <Input label="WhatsApp Number" value={settings.whatsapp_number || ''} onChange={(e) => setSettings({...settings, whatsapp_number: e.target.value})} onBlur={(e) => handleSave('whatsapp_number', e.target.value)} />
        </div>
      </Card>
    </div>
  );
};

export default AdminSettings;