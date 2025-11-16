import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Heart, Brain, Users, Shield, CheckCircle, ArrowRight, Sparkles, Star, Quote } from 'lucide-react';
import api from '../lib/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const EnhancedHome = () => {
  const [programs, setPrograms] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    fetchPrograms();
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % Math.max(testimonials.length, 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const fetchPrograms = async () => {
    try {
      const res = await api.get('/programs');
      setPrograms(res.data.data.slice(0, 6));
    } catch (error) {}
  };

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/testimonials', { params: { featured: 'true', limit: 7 } });
      setTestimonials(res.data.data);
    } catch (error) {}
  };

  const features = [
    { icon: Brain, title: 'AI-Powered Assessment', description: 'Advanced AI chat for mental health screening', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Users, title: 'Expert Therapists', description: '15+ years of mental health expertise', gradient: 'from-purple-500 to-pink-500' },
    { icon: Shield, title: 'Confidential & Secure', description: 'Your privacy is our priority', gradient: 'from-green-500 to-teal-500' },
    { icon: Heart, title: 'Holistic Approach', description: 'Comprehensive mind-body healing', gradient: 'from-red-500 to-orange-500' }
  ];

  const stats = [
    { number: '5000+', label: 'Happy Clients' },
    { number: '15+', label: 'Years Experience' },
    { number: '98%', label: 'Success Rate' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <>
      <Helmet><title>Hope Clinic - Professional Mental Health Services in India</title></Helmet>
      
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0"><div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl animate-pulse"></div><div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-pulse"></div></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6"><Sparkles className="w-4 h-4 text-primary-600 mr-2" /><span className="text-sm font-medium text-primary-700">India's Leading Mental Health Platform</span></div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">Your Journey to <span className="text-gradient bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Mental Wellness</span> Starts Here</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Professional therapy with AI-powered support by Dr. Bharat Agarwal</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book-appointment"><Button data-testid="book-appointment-btn" size="lg">Book Appointment<ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
                <Link to="/dashboard/ai-chat"><Button data-testid="try-ai-chat-btn" variant="outline" size="lg">Try AI Chat</Button></Link>
              </div>
              <div className="grid grid-cols-4 gap-6 mt-12">
                {stats.map((stat, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 * i }} className="text-center"><div className="text-3xl font-bold text-primary-600">{stat.number}</div><div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div></motion.div>))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}><img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800" alt="Mental Health" className="rounded-3xl shadow-2xl" /></motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16"><h2 className="text-4xl font-bold mb-4">Why Choose Hope Clinic?</h2></motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((f, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}><Card className="p-8 group hover:shadow-2xl transition-all transform hover:-translate-y-2"><div className={`w-14 h-14 bg-gradient-to-br ${f.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}><f.icon className="w-7 h-7 text-white" /></div><h3 className="text-xl font-semibold mb-3">{f.title}</h3><p className="text-gray-600 dark:text-gray-400">{f.description}</p></Card></motion.div>))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16"><h2 className="text-4xl font-bold mb-4">Our Therapy Programs</h2><p className="text-xl text-gray-600 dark:text-gray-300">Specialized care for various mental health concerns</p></motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((p, i) => (<motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}><Link to={`/programs/${p.slug}`}><Card className="overflow-hidden group"><div className="relative h-48 overflow-hidden"><img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div><div className="absolute top-4 right-4 text-4xl">{p.icon}</div></div><div className="p-6"><h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">{p.title}</h3><p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{p.description}</p><div className="flex items-center justify-between"><span className="text-primary-600 font-semibold">${p.price}/session</span><ArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-2 transition-transform" /></div></div></Card></Link></motion.div>))}
          </div>
          <div className="text-center mt-12"><Link to="/programs"><Button size="lg" variant="outline">View All Programs</Button></Link></div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16"><h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2><p className="text-xl text-white/90">Real experiences from people who found hope</p></motion.div>
          {testimonials.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div key={currentTestimonial} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className="glass backdrop-blur-xl rounded-3xl p-12 text-white relative">
                  <Quote className="w-16 h-16 text-white/20 absolute top-8 left-8" />
                  <div className="flex mb-4">{[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (<Star key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" />))}</div>
                  <p className="text-2xl font-light mb-8 relative z-10">{testimonials[currentTestimonial].message}</p>
                  <div className="flex items-center justify-between"><div><h4 className="font-bold text-xl">{testimonials[currentTestimonial].name}</h4><p className="text-white/80">{testimonials[currentTestimonial].location}</p></div><div className="flex gap-2">{testimonials.map((_, i) => (<button key={i} onClick={() => setCurrentTestimonial(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentTestimonial ? 'bg-white w-8' : 'bg-white/50'}`} />))}</div></div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
          <div className="text-center mt-12"><Link to="/testimonials"><Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">Read More Stories</Button></Link></div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4"><motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass p-12 rounded-3xl text-center max-w-4xl mx-auto"><h2 className="text-4xl font-bold mb-6">Ready to Start Your Healing Journey?</h2><p className="text-xl mb-8 text-gray-600 dark:text-gray-300">Take the first step towards better mental health today</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Link to="/book-appointment"><Button size="lg">Book Appointment</Button></Link><Link to="/contact"><Button variant="outline" size="lg">Contact Us</Button></Link></div></motion.div></div>
      </section>
    </>
  );
};

export default EnhancedHome;