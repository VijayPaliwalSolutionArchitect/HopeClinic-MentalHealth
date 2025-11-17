import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Heart, ChevronDown, LogOut, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';
import Button from './ui/Button';

const EnhancedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const programs = [
    { name: 'Anxiety & Stress', slug: 'anxiety-stress-management' },
    { name: 'Depression', slug: 'depression-treatment' },
    { name: 'Relationship Counseling', slug: 'relationship-counseling' },
    { name: 'Sexual Health', slug: 'sexual-health' },
    { name: 'Addiction Recovery', slug: 'addiction-recovery' },
    { name: 'Work-Life Balance', slug: 'work-life-balance' },
    { name: 'Trauma & PTSD', slug: 'trauma-ptsd' },
    { name: 'OCD Treatment', slug: 'ocd-treatment' },
    { name: 'Personality Disorders', slug: 'personality-disorders' },
    { name: 'Eating Disorders', slug: 'eating-disorders' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'glass-dark backdrop-blur-xl shadow-lg'
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
              <Heart className="w-7 h-7 text-white" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Hope Clinic
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            
            {/* Programs Dropdown */}
            <div className="relative" onMouseEnter={() => setIsProgramsOpen(true)} onMouseLeave={() => setIsProgramsOpen(false)}>
              <button className="nav-link flex items-center gap-1">
                Programs <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {isProgramsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 glass-dark backdrop-blur-xl rounded-xl shadow-2xl p-3"
                  >
                    {programs.map((program) => (
                      <Link
                        key={program.slug}
                        to={`/programs/${program.slug}`}
                        className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                      >
                        {program.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link to="/blogs" className="nav-link">Blog</Link>
            <Link to="/testimonials" className="nav-link">Testimonials</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all" aria-label="Toggle theme">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link 
                  to={user?.role === 'ADMIN' || user?.role === 'DOCTOR' ? '/admin' : '/dashboard'}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Sign In
                </Button>
              </Link>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-4"
            >
              <div className="space-y-2">
                <Link to="/" className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/programs" className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>Programs</Link>
                <Link to="/blogs" className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                <Link to="/testimonials" className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>Testimonials</Link>
                <Link to="/contact" className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                    <button onClick={handleLogout} className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    <Link to="/book-appointment" className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>Book Appointment</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style jsx>{`
        .nav-link {
          @apply text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-all relative;
        }
        .nav-link::after {
          content: '';
          @apply absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 transition-all duration-300;
        }
        .nav-link:hover::after {
          @apply w-full;
        }
      `}</style>
    </header>
  );
};

export default EnhancedHeader;