import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Heart, Target, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Card from '../components/ui/Card';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'We treat every patient with empathy, respect, and understanding.',
    },
    {
      icon: Award,
      title: 'Expert Excellence',
      description: '15+ years of experience in mental health care and therapy.',
    },
    {
      icon: Users,
      title: 'Patient-Centered',
      description: 'Your needs and goals are at the center of everything we do.',
    },
    {
      icon: Target,
      title: 'Evidence-Based',
      description: 'We use proven, scientifically-backed treatment methods.',
    },
  ];

  const achievements = [
    '5000+ Lives Transformed',
    '98% Patient Satisfaction',
    '15+ Years Experience',
    'Award-Winning Care',
  ];

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Hope Clinic and Dr. Bharat Agarwal, a renowned mental health professional with 15+ years of experience."
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About{' '}
              <span className="text-gradient bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Hope Clinic
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your trusted partner in mental wellness. We combine expertise, compassion,
              and cutting-edge technology to provide exceptional mental health care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800"
                alt="Dr. Bharat Agarwal"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Meet Dr. Bharat Agarwal
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Dr. Bharat Agarwal is a renowned mental health professional with over 15 years
                of experience in treating various mental health conditions. He specializes in
                cognitive behavioral therapy, mindfulness techniques, and holistic healing
                approaches.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                His mission is to make quality mental health care accessible to everyone,
                breaking down stigmas and creating a safe, supportive environment for healing
                and growth.
              </p>

              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-gray-900 dark:text-white font-medium">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide every aspect of our care
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl opacity-90 mb-8">
              To provide accessible, affordable, and exceptional mental health care that
              empowers individuals to lead fulfilling lives. We believe everyone deserves
              support on their journey to mental wellness.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div>
                <div className="text-5xl font-bold mb-2">5000+</div>
                <div className="text-lg opacity-90">Happy Patients</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">15+</div>
                <div className="text-lg opacity-90">Years Experience</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">98%</div>
                <div className="text-lg opacity-90">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;