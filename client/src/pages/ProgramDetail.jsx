import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, DollarSign, CheckCircle, Users, Award } from 'lucide-react';
import api from '../lib/api';
import SEO from '../components/SEO';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ProgramDetail = () => {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchProgram();
    }
  }, [slug]);

  const fetchProgram = async () => {
    try {
      const response = await api.get(`/programs/slug/${slug}`);
      setProgram(response.data.data);
    } catch (error) {
      console.error('Error fetching program:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
  }

  if (!program) {
    return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-3xl font-bold mb-4">Program not found</h1><Link to="/programs" className="text-primary-600 hover:underline">Back to Programs</Link></div></div>;
  }

  const benefits = program.benefits ? JSON.parse(program.benefits) : [];
  const whoItsFor = program.whoItsFor ? JSON.parse(program.whoItsFor) : [];

  return (
    <>
      <SEO title={program.title} description={program.description} image={program.image} />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
          <div className="container mx-auto px-4">
            <Link to="/programs" className="inline-flex items-center text-white/90 hover:text-white mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Programs
            </Link>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                <div className="text-6xl mb-4">{program.icon}</div>
                <h1 className="text-5xl font-bold mb-4">{program.title}</h1>
                <p className="text-xl opacity-90 mb-6">{program.description}</p>
                <div className="flex gap-6">
                  {program.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{program.duration}</span>
                    </div>
                  )}
                  {program.price && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      <span>${program.price}/session</span>
                    </div>
                  )}
                </div>
              </motion.div>
              {program.image && (
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
                  <img src={program.image} alt={program.title} className="rounded-2xl shadow-2xl" />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-8 h-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Benefits</h2>
                </div>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Who It's For</h2>
                </div>
                <div className="space-y-3">
                  {whoItsFor.map((person, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{person}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-white max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <p className="text-xl mb-8 opacity-90">Book your first consultation with Dr. Bharat Agarwal</p>
              <Link to="/book-appointment"><Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">Book Appointment Now</Button></Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProgramDetail;