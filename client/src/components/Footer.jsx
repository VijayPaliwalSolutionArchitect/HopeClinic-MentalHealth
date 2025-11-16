import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-white">Hope Clinic</span>
            </div>
            <p className="text-sm mb-4">
              Professional mental health services with compassion and expertise. Your journey to wellness starts here.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-primary-400 transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-primary-400 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/programs/depression-anxiety" className="hover:text-primary-400 transition-colors">
                  Depression & Anxiety
                </Link>
              </li>
              <li>
                <Link to="/programs/relationship-counseling" className="hover:text-primary-400 transition-colors">
                  Relationship Counseling
                </Link>
              </li>
              <li>
                <Link to="/programs/addiction-recovery" className="hover:text-primary-400 transition-colors">
                  Addiction Recovery
                </Link>
              </li>
              <li>
                <Link to="/programs/sexual-health" className="hover:text-primary-400 transition-colors">
                  Sexual Health Therapy
                </Link>
              </li>
              <li>
                <Link to="/programs/stress-management" className="hover:text-primary-400 transition-colors">
                  Stress Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>123 Mental Wellness Street, Mumbai, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary-400 transition-colors">
                  +91-9876543210
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@hopeclinic.com" className="hover:text-primary-400 transition-colors">
                  info@hopeclinic.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Hope Clinic. All rights reserved.</p>
          <p className="mt-2">
            Designed with <Heart className="inline w-4 h-4 text-red-500" fill="currentColor" /> for Mental Wellness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;