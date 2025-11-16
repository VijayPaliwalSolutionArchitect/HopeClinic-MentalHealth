import React from 'react';
import { Outlet } from 'react-router-dom';
import EnhancedHeader from '../components/EnhancedHeader';
import EnhancedFooter from '../components/EnhancedFooter';
import WhatsAppButton from '../components/WhatsAppButton';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <EnhancedFooter />
      <WhatsAppButton />
    </div>
  );
};

export default MainLayout;