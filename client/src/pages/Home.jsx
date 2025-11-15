import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Heart, Brain, Users, Shield, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Assessment',
      description: 'Advanced AI chat system for initial mental health screening and ongoing support',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Expert Therapists',
      description: 'Experienced mental health professionals with 15+ years of expertise',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Shield,
      title: 'Confidential & Secure',
      description: 'Your privacy is our priority. All sessions are completely confidential',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      icon: Heart,
      title: 'Holistic Approach',
      description: 'Comprehensive treatment addressing mind, body, and emotional well-being',
      gradient: 'from-red-500 to-orange-500',
    },
  ];

  const stats = [
    { number: '5000+', label: 'Happy Clients' },
    { number: '15+', label: 'Years Experience' },
    { number: '98%', label: 'Success Rate' },
    { number: '24/7', label: 'Support Available' },
  ];

  return (
    <>
      <Helmet>
        <title>Hope Clinic - Professional Mental Health Services in India</title>
        <meta
          name="description"
          content="Expert mental health therapy and counseling services by Dr. Bharat Agarwal. Online and offline consultations available for depression, anxiety, addiction, and relationship issues."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2" />
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  India's Leading Mental Health Platform
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Your Journey to{' '}
                <span className="text-gradient bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Mental Wellness
                </span>{' '}
                Starts Here
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Professional therapy and counseling services by Dr. Bharat Agarwal with AI-powered support.
                Take the first step towards a healthier, happier you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book-appointment">
                  <Button size="lg" className="w-full sm:w-auto">
                    Book Appointment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/dashboard/ai-chat">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Try AI Chat Assistant
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800"
                  alt="Mental Health Professional"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Patient Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Hope Clinic?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive mental health care with cutting-edge technology and compassionate professionals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Your Healing Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Take the first step towards better mental health. Book your consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-appointment">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 w-full sm:w-auto">
                  Book Appointment Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
