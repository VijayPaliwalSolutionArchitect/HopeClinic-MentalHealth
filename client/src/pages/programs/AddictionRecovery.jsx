import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Heart, Users, Shield, CheckCircle, Phone, Calendar, TrendingUp, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const AddictionRecovery = () => {
  const stats = [
    { value: '85%', label: 'Success Rate', icon: TrendingUp },
    { value: '1,500+', label: 'In Recovery', icon: Users },
    { value: '16-24', label: 'Weeks Program', icon: Clock },
    { value: '4.7/5', label: 'Rating', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-red-500/10 to-transparent blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gray-900 dark:text-white">Break Free From</span>
                <span className="block mt-2 bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">Addiction</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Comprehensive, compassionate addiction treatment. Recovery is possible, and we're here to help every step of the way.
              </p>
              <div className="grid grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <div key={i} className="glass backdrop-blur-xl rounded-2xl p-4 text-center">
                    <stat.icon className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/book-appointment">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-red-500">
                  <Calendar className="w-5 h-5 mr-2" />Start Recovery Today</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddictionRecovery;
