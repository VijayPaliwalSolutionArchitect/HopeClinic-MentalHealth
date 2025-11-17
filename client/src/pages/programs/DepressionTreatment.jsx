import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Shield, Sun, CheckCircle, ArrowRight, Phone, Calendar, Users, TrendingUp, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const DepressionTreatment = () => {
  const symptoms = [
    'Persistent sadness or emptiness',
    'Loss of interest in activities',
    'Changes in appetite or weight',
    'Sleep disturbances',
    'Fatigue or loss of energy',
    'Feelings of worthlessness',
    'Difficulty concentrating',
    'Thoughts of death or suicide'
  ];

  const causes = [
    { title: 'Biological Factors', description: 'Brain chemistry and genetic predisposition', icon: Brain },
    { title: 'Environmental Stress', description: 'Trauma, loss, or major life changes', icon: Shield },
    { title: 'Medical Conditions', description: 'Chronic illness or hormonal imbalances', icon: Heart },
    { title: 'Psychological Factors', description: 'Personality traits and coping skills', icon: Sun }
  ];

  const treatments = [
    {
      level: 'Basic',
      color: 'from-purple-500 to-pink-500',
      techniques: [
        { name: 'Daily Routine', description: 'Structured schedule and sleep hygiene' },
        { name: 'Physical Exercise', description: '30 minutes daily activity' },
        { name: 'Social Connection', description: 'Regular interaction with supportive people' },
        { name: 'Healthy Nutrition', description: 'Balanced diet and hydration' }
      ]
    },
    {
      level: 'Intermediate',
      color: 'from-blue-500 to-indigo-500',
      techniques: [
        { name: 'Cognitive Behavioral Therapy', description: 'Change negative thought patterns' },
        { name: 'Mindfulness-Based Therapy', description: 'MBCT for relapse prevention' },
        { name: 'Interpersonal Therapy', description: 'Improve relationships and communication' },
        { name: 'Support Groups', description: 'Peer-led recovery programs' }
      ]
    },
    {
      level: 'Advanced',
      color: 'from-green-500 to-teal-500',
      techniques: [
        { name: 'Medication Management', description: 'SSRIs, SNRIs under supervision' },
        { name: 'Transcranial Magnetic Stimulation', description: 'TMS for treatment-resistant cases' },
        { name: 'Electroconvulsive Therapy', description: 'ECT for severe depression' },
        { name: 'Intensive Therapy Program', description: 'Day treatment with multi-modal approach' }
      ]
    }
  ];

  const successStories = [
    { name: 'Michael T.', before: 'Couldn\'t get out of bed', after: 'Back to work and enjoying life', duration: '14 weeks', rating: 5 },
    { name: 'Lisa P.', before: 'Lost all motivation', after: 'Rediscovered passions and hobbies', duration: '16 weeks', rating: 5 },
    { name: 'David K.', before: 'Constant negative thoughts', after: 'Positive outlook and energy', duration: '12 weeks', rating: 5 }
  ];

  const stats = [
    { value: '91%', label: 'Success Rate', icon: TrendingUp },
    { value: '3,200+', label: 'Patients Helped', icon: Users },
    { value: '10-16', label: 'Average Weeks', icon: Clock },
    { value: '4.8/5', label: 'Patient Rating', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent blur-3xl" />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute top-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center px-4 py-2 bg-purple-500/10 backdrop-blur-xl rounded-full mb-6 border border-purple-500/20">
                <Heart className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-900 dark:text-purple-300">Evidence-Based Treatment</span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gray-900 dark:text-white">Find Hope in</span>
                <span className="block mt-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Depression Treatment</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Professional, compassionate care to help you overcome depression. Rediscover joy, energy, and purpose in your life with our proven treatment approaches.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }} className="glass backdrop-blur-xl rounded-2xl p-4 border border-white/20 text-center">
                    <stat.icon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book-appointment">
                  <Button data-testid="book-consultation-btn" size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 border-0 shadow-lg">
                    <Calendar className="w-5 h-5 mr-2" />Book Free Consultation</Button>
                </Link>
                <a href="tel:+919876543210">
                  <Button size="lg" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400">
                    <Phone className="w-5 h-5 mr-2" />Call Now</Button>
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="glass backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop" alt="Hope and Recovery" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is Depression */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Understanding <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Depression</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Depression is a common but serious mood disorder that affects how you feel, think, and handle daily activities. It's more than just feeling sad—it's a persistent condition that requires professional treatment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: 'Major Depressive Disorder', description: 'Persistent feelings of sadness and loss of interest lasting weeks or months', icon: Heart },
              { title: 'Persistent Depressive Disorder', description: 'Chronic depression lasting for two years or longer', icon: Brain },
              { title: 'Seasonal Affective Disorder', description: 'Depression that occurs during specific seasons, usually winter', icon: Sun }
            ].map((type, index) => (
              <motion.div key={type.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-purple-100 dark:border-purple-900">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                    <type.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{type.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{type.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Common <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Symptoms</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Early recognition leads to better outcomes</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {symptoms.map((symptom, index) => (
              <motion.div key={symptom} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="glass backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all">
                <CheckCircle className="w-8 h-8 text-purple-600 mb-3" />
                <p className="font-medium text-gray-900 dark:text-white">{symptom}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Causes */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              What <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Causes</span> Depression?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Multiple factors contribute to depression</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {causes.map((cause, index) => (
              <motion.div key={cause.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="h-full text-center hover:shadow-2xl transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <cause.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{cause.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{cause.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Treatment <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Approaches</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Comprehensive care tailored to your needs</p>
          </motion.div>

          <div className="space-y-8 max-w-6xl mx-auto">
            {treatments.map((treatment, treatmentIndex) => (
              <motion.div key={treatment.level} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: treatmentIndex * 0.2 }}>
                <div className="glass backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`px-6 py-2 bg-gradient-to-r ${treatment.color} rounded-full text-white font-bold text-lg`}>{treatment.level}</div>
                    <div className="h-1 flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700 rounded-full" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {treatment.techniques.map((technique, index) => (
                      <motion.div key={technique.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * index }} className="flex gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl">
                        <div className={`w-10 h-10 bg-gradient-to-br ${treatment.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-1">{technique.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{technique.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Success <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Recovery is possible with the right support</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <motion.div key={story.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(story.rating)].map((_, i) => (<span key={i} className="text-yellow-500">★</span>))}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Before:</div>
                      <div className="font-medium text-red-600 dark:text-red-400">{story.before}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-purple-600 mx-auto" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">After {story.duration}:</div>
                      <div className="font-medium text-green-600 dark:text-green-400">{story.after}</div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="font-bold text-gray-900 dark:text-white">{story.name}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Take the First Step Today</h2>
            <p className="text-xl mb-8 text-purple-100">You don't have to face depression alone. Our compassionate therapists are here to guide you toward recovery and renewed hope.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-appointment">
                <Button size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-purple-50 border-0">
                  <Calendar className="w-5 h-5 mr-2" />Book Free Consultation</Button>
              </Link>
              <a href="tel:+919876543210">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="w-5 h-5 mr-2" />Call: +91 9876543210</Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DepressionTreatment;