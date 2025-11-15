import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import api from '../lib/api';
import SEO from '../components/SEO';
import Card from '../components/ui/Card';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get('/testimonials');
      setTestimonials(response.data.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <>
      <SEO
        title="Patient Testimonials"
        description="Read success stories and testimonials from patients who have experienced transformation through Hope Clinic's mental health services."
      />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Success{' '}
              <span className="text-gradient bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Stories
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real experiences from people who found hope and healing
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-800 h-64 rounded-2xl"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        {testimonial.location && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.location}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex mb-4">{renderStars(testimonial.rating)}</div>

                    <div className="relative flex-1">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary-200 dark:text-primary-900" />
                      <p className="text-gray-700 dark:text-gray-300 relative z-10 pl-6">
                        {testimonial.message}
                      </p>
                    </div>

                    {testimonial.program && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Program:</span> {testimonial.program}
                        </p>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Start Your Own Success Story
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands who have found hope and healing at Hope Clinic
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;