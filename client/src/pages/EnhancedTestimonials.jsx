import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../lib/api';
import SEO from '../components/SEO';
import Card from '../components/ui/Card';

const EnhancedTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => { fetchTestimonials(); }, []);
  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => setCurrent((p) => (p + 1) % Math.max(testimonials.length, 1)), 4000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length, paused]);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data.data);
    } catch (error) {}
  };

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <>
      <SEO title="Patient Testimonials" description="Success stories from Hope Clinic patients" />
      
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"><div className="container mx-auto px-4"><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center"><h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">Success <span className="text-gradient bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Stories</span></h1><p className="text-xl text-gray-600 dark:text-gray-300">Real experiences from people who found hope and healing at Hope Clinic. These stories inspire us every day.</p></motion.div></div></section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          {testimonials.length > 0 && (
            <div className="max-w-5xl mx-auto" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
              <div className="relative">
                <motion.div key={current} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="glass backdrop-blur-2xl rounded-3xl p-12 text-white border border-white/20 shadow-2xl">
                  <Quote className="w-20 h-20 text-white/20 absolute top-8 left-8" />
                  <div className="flex mb-6">{[...Array(testimonials[current].rating)].map((_, i) => (<Star key={i} className="w-7 h-7 text-yellow-400" fill="currentColor" />))}</div>
                  <p className="text-2xl font-light mb-8 leading-relaxed relative z-10">"{testimonials[current].message}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">{testimonials[current].name.charAt(0)}</div>
                      <div><h4 className="font-bold text-xl">{testimonials[current].name}</h4><p className="text-white/80">{testimonials[current].location}</p><p className="text-sm text-white/60 mt-1">{testimonials[current].program}</p></div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={prev} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><ChevronLeft className="w-6 h-6" /></button>
                      <button onClick={next} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><ChevronRight className="w-6 h-6" /></button>
                    </div>
                  </div>
                </motion.div>
                <div className="flex justify-center gap-2 mt-8">{testimonials.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? 'bg-white w-8' : 'bg-white/50 w-2'}`} />))}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4"><div className="grid md:grid-cols-3 gap-8">{testimonials.slice(0, 6).map((t, i) => (<motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}><Card className="p-6 hover:shadow-2xl transition-shadow"><div className="flex items-center gap-3 mb-4">{t.avatar ? <img src={t.avatar} className="w-12 h-12 rounded-full" /> : <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">{t.name.charAt(0)}</div>}<div><h3 className="font-semibold">{t.name}</h3><p className="text-sm text-gray-500">{t.location}</p></div></div><div className="flex mb-3">{[...Array(t.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />))}</div><p className="text-gray-700 dark:text-gray-300 mb-3">{t.message}</p>{t.program && <p className="text-xs text-gray-500">Program: {t.program}</p>}</Card></motion.div>))}</div></div>
      </section>
    </>
  );
};

export default EnhancedTestimonials;