import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Download } from 'lucide-react';
import Button from './ui/Button';

const EnhancedFooter = () => {
  const handleInstallPWA = () => {
    if ('serviceWorker' in navigator) {
      const installPrompt = localStorage.getItem('pwa-install-prompt');
      if (installPrompt) {
        toast.info('Click the install button in your browser to add Hope Clinic to your device');
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-primary-900/20 to-gray-900 text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div><div className="flex items-center space-x-2 mb-4"><div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center"><Heart className="w-6 h-6 text-white" fill="currentColor" /></div><span className="text-xl font-bold text-white">Hope Clinic</span></div><p className="text-sm mb-4">Professional mental health services with compassion and expertise. Your journey to wellness starts here.</p><div className="flex space-x-4"><a href="#" className="hover:text-primary-400 transition-colors"><Facebook className="w-5 h-5" /></a><a href="#" className="hover:text-primary-400 transition-colors"><Twitter className="w-5 h-5" /></a><a href="#" className="hover:text-primary-400 transition-colors"><Instagram className="w-5 h-5" /></a><a href="#" className="hover:text-primary-400 transition-colors"><Linkedin className="w-5 h-5" /></a></div></div>
          
          <div><h3 className="text-white font-semibold mb-4">Quick Links</h3><ul className="space-y-2 text-sm"><li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li><li><Link to="/programs" className="hover:text-primary-400 transition-colors">Programs</Link></li><li><Link to="/blogs" className="hover:text-primary-400 transition-colors">Blog</Link></li><li><Link to="/testimonials" className="hover:text-primary-400 transition-colors">Testimonials</Link></li><li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li></ul></div>
          
          <div><h3 className="text-white font-semibold mb-4">Services</h3><ul className="space-y-2 text-sm"><li><Link to="/programs/anxiety-stress-management" className="hover:text-primary-400 transition-colors">Anxiety & Stress</Link></li><li><Link to="/programs/depression-treatment" className="hover:text-primary-400 transition-colors">Depression</Link></li><li><Link to="/programs/relationship-counseling" className="hover:text-primary-400 transition-colors">Relationship Counseling</Link></li><li><Link to="/programs/addiction-recovery" className="hover:text-primary-400 transition-colors">Addiction Recovery</Link></li><li><Link to="/programs/trauma-ptsd" className="hover:text-primary-400 transition-colors">Trauma & PTSD</Link></li></ul></div>
          
          <div><h3 className="text-white font-semibold mb-4">Contact Us</h3><ul className="space-y-3 text-sm"><li className="flex items-start space-x-3"><MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" /><span>123 Mental Wellness Street, Mumbai, India</span></li><li className="flex items-center space-x-3"><Phone className="w-5 h-5 text-primary-400 flex-shrink-0" /><a href="tel:+919876543210" className="hover:text-primary-400 transition-colors">+91-9876543210</a></li><li className="flex items-center space-x-3"><Mail className="w-5 h-5 text-primary-400 flex-shrink-0" /><a href="mailto:info@hopeclinic.com" className="hover:text-primary-400 transition-colors">info@hopeclinic.com</a></li></ul></div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">&copy; 2025 Hope Clinic. All rights reserved. Designed with <Heart className="inline w-4 h-4 text-red-500" fill="currentColor" /> for Mental Wellness</p>
            <button onClick={handleInstallPWA} className="glass backdrop-blur-lg px-6 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-transform flex items-center gap-2 border border-white/20 hover:border-primary-500">
              <Download className="w-5 h-5" />
              Install App to Device
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;