import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Award, Target, CheckCircle, Sparkles, TrendingUp, Shield } from 'lucide-react';
import Card from '../components/ui/Card';

const About = () => {
  const values = [
    { icon: Heart, title: 'Compassionate Care', description: 'Every patient receives personalized, empathetic treatment', color: 'from-rose-500 to-pink-500' },
    { icon: Shield, title: 'Confidentiality', description: 'Your privacy and trust are our top priorities', color: 'from-blue-500 to-cyan-500' },
    { icon: Award, title: 'Excellence', description: 'Evidence-based practices from leading experts', color: 'from-purple-500 to-indigo-500' },
    { icon: Target, title: 'Results-Driven', description: 'Measurable outcomes and lasting transformation', color: 'from-green-500 to-emerald-500' }
  ];

  const stats = [
    { value: '15+', label: 'Years Experience', icon: TrendingUp },
    { value: '5,000+', label: 'Lives Changed', icon: Users },
    { value: '92%', label: 'Success Rate', icon: Award },
    { value: '50+', label: 'Expert Therapists', icon: Heart }
  ];

  const team = [
    { name: 'Dr. Bharat Kumar', role: 'Chief Psychiatrist', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop', specialty: '20+ years experience' },
    { name: 'Dr. Priya Sharma', role: 'Clinical Psychologist', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop', specialty: 'CBT & EMDR specialist' },
    { name: 'Dr. Arjun Patel', role: 'Addiction Specialist', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop', specialty: '15+ years recovery' },
    { name: 'Dr. Ananya Singh', role: 'Family Therapist', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop', specialty: 'Relationship expert' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/10 to-transparent blur-3xl" />
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 30, repeat: Infinity }} className="absolute top-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center px-6 py-3 bg-primary-500/10 backdrop-blur-xl rounded-full mb-8 border border-primary-500/20">
              <Sparkles className="w-5 h-5 text-primary-600 mr-2" />
              <span className="text-lg font-medium text-primary-900 dark:text-primary-300">Trusted Mental Health Care</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gray-900 dark:text-white">Your Journey to</span>
              <span className="block mt-2 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent">Wellness Starts Here</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              Hope Clinic combines cutting-edge therapy with compassionate care to help you achieve lasting mental wellness. We're not just treating symptoms—we're transforming lives.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }} className="glass backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Our <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                At Hope Clinic, we believe everyone deserves access to quality mental health care. Our mission is to provide evidence-based, compassionate treatment that empowers individuals to overcome challenges and live fulfilling lives.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Founded in 2009, we've grown from a small practice to a leading mental health center, serving thousands of patients with a wide range of conditions—from anxiety and depression to complex trauma and addiction.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="glass backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop" alt="Our Clinic" className="w-full h-80 object-cover rounded-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Core <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These principles guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="h-full text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Meet Our <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Expert Team</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Board-certified professionals dedicated to your wellness
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div key={member.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="text-center overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img src={member.image} alt={member.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.specialty}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Transform Your Life?</h2>
            <p className="text-xl mb-8 text-primary-100">
              Join thousands who've found hope and healing at our clinic. Your journey starts with a single step.
            </p>
            <button className="px-8 py-4 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-primary-50 transition-all duration-300 hover:scale-105 shadow-xl">
              Book Free Consultation
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;