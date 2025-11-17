import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Brain, Zap, CheckCircle, ArrowRight, Phone, Calendar, Users, TrendingUp, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const TraumaPTSDTherapy = () => {
  const symptoms = ['Flashbacks and nightmares', 'Avoidance of trauma reminders', 'Hypervigilance and startling easily', 'Negative thoughts about self', 'Emotional numbness', 'Difficulty sleeping', 'Irritability or anger', 'Memory problems'];
  const causes = [
    { title: 'Combat Experience', description: 'Military service and war trauma', icon: Shield },
    { title: 'Physical Assault', description: 'Violence or abuse experiences', icon: Zap },
    { title: 'Accidents', description: 'Serious accidents or injuries', icon: Brain },
    { title: 'Natural Disasters', description: 'Earthquakes, floods, fires', icon: Heart }
  ];
  const treatments = [
    { level: 'Basic', color: 'from-green-500 to-emerald-500', techniques: [
      { name: 'Safety & Stabilization', description: 'Creating a safe environment' },
      { name: 'Grounding Techniques', description: 'Stay present during flashbacks' },
      { name: 'Breathing Exercises', description: 'Manage anxiety and panic' },
      { name: 'Sleep Hygiene', description: 'Improve rest and recovery' }
    ]},
    { level: 'Intermediate', color: 'from-teal-500 to-cyan-500', techniques: [
      { name: 'EMDR Therapy', description: 'Eye Movement Desensitization' },
      { name: 'Trauma-Focused CBT', description: 'Process traumatic memories safely' },
      { name: 'Prolonged Exposure', description: 'Gradual confrontation of fears' },
      { name: 'Support Groups', description: 'Connect with other survivors' }
    ]},
    { level: 'Advanced', color: 'from-blue-500 to-indigo-500', techniques: [
      { name: 'Intensive Trauma Therapy', description: 'Accelerated resolution techniques' },
      { name: 'Medication Management', description: 'SSRIs for PTSD symptoms' },
      { name: 'Somatic Experiencing', description: 'Release trauma from the body' },
      { name: 'Residential Treatment', description: 'Comprehensive 24/7 care' }
    ]}
  ];
  const stats = [
    { value: '89%', label: 'Success Rate', icon: TrendingUp },
    { value: '2,100+', label: 'Patients Helped', icon: Users },
    { value: '12-20', label: 'Average Weeks', icon: Clock },
    { value: '4.8/5', label: 'Patient Rating', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-transparent blur-3xl" />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute top-20 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center px-4 py-2 bg-green-500/10 backdrop-blur-xl rounded-full mb-6 border border-green-500/20">
                <Shield className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-900 dark:text-green-300">Specialized Trauma Care</span>
              </motion.div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gray-900 dark:text-white">Heal From</span>
                <span className="block mt-2 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Trauma & PTSD</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Compassionate, evidence-based treatment to help you process trauma and reclaim your life. You're safe here.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }} className="glass backdrop-blur-xl rounded-2xl p-4 border border-white/20 text-center">
                    <stat.icon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book-appointment">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 border-0 shadow-lg">
                    <Calendar className="w-5 h-5 mr-2" />Book Free Consultation</Button>
                </Link>
                <a href="tel:+919876543210">
                  <Button size="lg" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                    <Phone className="w-5 h-5 mr-2" />Call Now</Button>
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="glass backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=600&h=400&fit=crop" alt="Hope and Healing" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Begin Your Healing Journey</h2>
            <p className="text-xl mb-8 text-green-100">Trauma doesn't define you. Let us help you find peace and rebuild your life.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-appointment">
                <Button size="lg" variant="outline" className="bg-white text-green-600 hover:bg-green-50 border-0">
                  <Calendar className="w-5 h-5 mr-2" />Book Free Consultation</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TraumaPTSDTherapy;
