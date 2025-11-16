import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const userStr = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      toast.error('Authentication failed. Please try again.');
      navigate('/login');
      return;
    }

    if (accessToken && refreshToken && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        setAuth(user, accessToken, refreshToken);
        toast.success(`Welcome ${user.firstName}!`);
        
        // Redirect based on role
        if (user.role === 'ADMIN' || user.role === 'DOCTOR') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        toast.error('Invalid authentication data');
        navigate('/login');
      }
    } else {
      toast.error('Authentication failed. Missing credentials.');
      navigate('/login');
    }
  }, [searchParams, navigate, setAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Completing authentication...</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Please wait while we sign you in</p>
      </div>
    </div>
  );
};

export default AuthCallback;
