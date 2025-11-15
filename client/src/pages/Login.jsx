import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
        <p className="text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;