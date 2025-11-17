import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Shield, Zap, CheckCircle, ArrowRight, Phone, Calendar, Users, TrendingUp, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const AnxietyStressManagement = () => {
  const symptoms = [
    'Excessive worrying or fear',
    'Restlessness or feeling on edge',
    'Difficulty concentrating',
    'Muscle tension and headaches',
    'Sleep disturbances',
    'Rapid heartbeat or sweating',
    'Panic attacks',
    'Avoidance of social situations'
  ];

  const causes = [
    { title: 'Genetics', description: 'Family history of anxiety disorders', icon: Users },
    { title: 'Brain Chemistry', description: 'Imbalance in neurotransmitters', icon: Brain },
    { title: 'Life Stress', description: 'Major life changes or trauma', icon: Zap },
    { title: 'Personality', description: 'Certain personality traits', icon: Heart }
  ];

  const treatments = [
    {
      level: 'Basic',
      color: 'from-blue-500 to-cyan-500',
      techniques: [
        { name: 'Deep Breathing Exercises', description: 'Simple 5-minute breathing techniques' },
        { name: 'Progressive Muscle Relaxation', description: 'Systematic tension and relaxation' },
        { name: 'Mindfulness Meditation', description: 'Present-moment awareness practices' },
        { name: 'Regular Exercise', description: 'Physical activity to reduce stress' }
      ]
    },
    {
      level: 'Intermediate',
      color: 'from-purple-500 to-pink-500',
      techniques: [
        { name: 'Cognitive Behavioral Therapy (CBT)', description: 'Identify and change thought patterns' },
        { name: 'Exposure Therapy', description: 'Gradual exposure to anxiety triggers' },
        { name: 'Acceptance and Commitment Therapy', description: 'Accept thoughts without judgment' },
        { name: 'Group Therapy', description: 'Peer support and shared experiences' }
      ]
    },
    {
      level: 'Advanced',
      color: 'from-green-500 to-emerald-500',
      techniques: [
        { name: 'EMDR Therapy', description: 'Eye Movement Desensitization and Reprocessing' },
        { name: 'Medication Management', description: 'SSRIs, SNRIs, or benzodiazepines if needed' },
        { name: 'Neurofeedback', description: 'Brain training for anxiety regulation' },
        { name: 'Intensive Outpatient Program', description: 'Comprehensive daily treatment' }
      ]
    }
  ];

  const successStories = [
    { name: 'Sarah M.', before: 'Panic attacks 3-4 times daily', after: 'Attack-free for 6 months', duration: '12 weeks', rating: 5 },
    { name: 'James R.', before: 'Unable to leave home', after: 'Returned to work full-time', duration: '16 weeks', rating: 5 },
    { name: 'Emily K.', before: 'Constant worrying, insomnia', after: 'Peaceful sleep, clear mind', duration: '10 weeks', rating: 5 }
  ];

  const stats = [
    { value: '94%', label: 'Success Rate', icon: TrendingUp },
    { value: '2,500+', label: 'Patients Helped', icon: Users },
    { value: '8-12', label: 'Average Weeks', icon: Clock },
    { value: '4.9/5', label: 'Patient Rating', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent blur-3xl" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center px-4 py-2 bg-blue-500/10 backdrop-blur-xl rounded-full mb-6 border border-blue-500/20"
              >
                <Brain className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-300">Professional Anxiety Treatment</span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gray-900 dark:text-white">Overcome</span>
                <span className="block mt-2 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Anxiety & Stress
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Evidence-based therapy to help you manage anxiety, reduce stress, and reclaim your peace of mind. Start your journey to a calmer, more confident you.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="glass backdrop-blur-xl rounded-2xl p-4 border border-white/20 text-center"
                  >
                    <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book-appointment">
                  <Button data-testid="book-consultation-btn" size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 border-0 shadow-lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Free Consultation
                  </Button>
                </Link>
                <a href="tel:+919876543210">
                  <Button size="lg" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop"
                    alt="Peace and Calm"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is Anxiety Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Understanding <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Anxiety Disorders</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Anxiety disorders are the most common mental health condition, affecting millions worldwide. They involve persistent, excessive worry and fear that interferes with daily activities. While anxiety is a normal response to stress, anxiety disorders involve more than temporary worry or fear.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: 'Generalized Anxiety Disorder (GAD)', description: 'Chronic anxiety and excessive worry about everyday situations', icon: Brain },
              { title: 'Panic Disorder', description: 'Recurrent panic attacks with intense fear and physical symptoms', icon: Zap },
              { title: 'Social Anxiety Disorder', description: 'Intense fear of social situations and being judged by others', icon: Users }
            ].map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 dark:border-blue-900">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
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

      {/* Symptoms Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Common <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Symptoms</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Recognizing the signs is the first step toward getting help
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {symptoms.map((symptom, index) => (
              <motion.div
                key={symptom}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all"
              >
                <CheckCircle className="w-8 h-8 text-blue-600 mb-3" />
                <p className="font-medium text-gray-900 dark:text-white">{symptom}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Causes Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              What <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Causes</span> Anxiety?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Anxiety disorders develop from a complex set of risk factors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {causes.map((cause, index) => (
              <motion.div
                key={cause.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-2xl transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
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

      {/* Treatment Approaches */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Treatment <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Approaches</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From basic coping strategies to advanced therapeutic interventions
            </p>
          </motion.div>

          <div className="space-y-8 max-w-6xl mx-auto">
            {treatments.map((treatment, treatmentIndex) => (
              <motion.div
                key={treatment.level}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: treatmentIndex * 0.2 }}
              >
                <div className="glass backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`px-6 py-2 bg-gradient-to-r ${treatment.color} rounded-full text-white font-bold text-lg`}>
                      {treatment.level}
                    </div>
                    <div className="h-1 flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700 rounded-full" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {treatment.techniques.map((technique, index) => (
                      <motion.div
                        key={technique.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                        className="flex gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl"
                      >
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Success <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real results from real patients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Before:</div>
                      <div className="font-medium text-red-600 dark:text-red-400">{story.before}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-600 mx-auto" />
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
      <section className="py-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Take the first step toward a calmer, more peaceful life. Our expert therapists are here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-appointment">
                <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-0">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </Button>
              </Link>
              <a href="tel:+919876543210">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 9876543210
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AnxietyStressManagement;
