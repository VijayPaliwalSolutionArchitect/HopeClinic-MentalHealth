import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';
import Button from './ui/Button';

const GoogleAuthButton = ({ variant = 'outline', size = 'md', text = 'Continue with Google' }) => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    // Load Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!googleLoaded || !window.google) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || clientId.includes('placeholder')) {
      console.warn('Google Client ID not configured');
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });
    } catch (error) {
      console.error('Error initializing Google Auth:', error);
    }
  }, [googleLoaded]);

  const handleCredentialResponse = async (response) => {
    setLoading(true);
    try {
      const result = await api.post('/auth/google', {
        token: response.credential,
      });

      const { user, accessToken, refreshToken } = result.data.data;
      setAuth(user, accessToken, refreshToken);
      
      toast.success(`Welcome ${user.firstName}!`);
      
      // Redirect based on role
      if (user.role === 'ADMIN' || user.role === 'DOCTOR') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Google authentication failed');
      console.error('Google auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!window.google) {
      toast.error('Google Sign-In not loaded. Please refresh the page.');
      return;
    }

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || clientId.includes('placeholder')) {
      toast.error('Google authentication is not configured. Please contact support.');
      return;
    }

    try {
      window.google.accounts.id.prompt();
    } catch (error) {
      console.error('Error prompting Google Sign-In:', error);
      toast.error('Failed to open Google Sign-In');
    }
  };

  return (
    <Button
      data-testid="google-auth-button"
      variant={variant}
      size={size}
      onClick={handleGoogleLogin}
      loading={loading}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3"
    >
      {!loading && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
          <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
          <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
          <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
        </svg>
      )}
      <span>{text}</span>
    </Button>
  );
};

export default GoogleAuthButton;
