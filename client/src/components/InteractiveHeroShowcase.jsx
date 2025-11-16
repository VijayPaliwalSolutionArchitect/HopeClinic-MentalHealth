import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Heart, Users, Zap, Shield, Sparkles, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

const InteractiveHeroShowcase = () => {
  const [activeProgram, setActiveProgram] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const intervalRef = useRef(null);

  const programs = [
    {
      id: 'anxiety',
      query: 'feeling anxious and stressed',
      title: 'Anxiety & Stress Management',
      description: 'Professional therapy for managing anxiety, panic attacks, and chronic stress',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      icon: Brain,
      stats: { sessions: '2,500+', success: '94%', duration: '8-12 weeks' },
      benefits: ['Stress reduction techniques', 'Cognitive behavioral therapy', 'Mindfulness practices', 'Panic attack management'],
      slug: 'anxiety-stress-management'
    },
    {
      id: 'depression',
      query: 'dealing with depression',
      title: 'Depression Treatment',
      description: 'Evidence-based therapy to overcome depression and find joy again',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
      icon: Heart,
      stats: { sessions: '3,200+', success: '91%', duration: '10-16 weeks' },
      benefits: ['Personalized treatment plans', 'Medication management', 'Behavioral activation', 'Support groups'],
      slug: 'depression-treatment'
    },
    {
      id: 'relationship',
      query: 'relationship problems',
      title: 'Relationship Counseling',
      description: 'Strengthen bonds and resolve conflicts with professional guidance',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop',
      color: 'from-rose-500 to-orange-500',
      bgGradient: 'from-rose-500/20 via-orange-500/10 to-transparent',
      icon: Users,
      stats: { sessions: '1,800+', success: '88%', duration: '6-10 weeks' },
      benefits: ['Communication skills', 'Conflict resolution', 'Intimacy building', 'Trust rebuilding'],
      slug: 'relationship-counseling'
    },
    {
      id: 'trauma',
      query: 'trauma and PTSD recovery',
      title: 'Trauma & PTSD Therapy',
      description: 'Safe, compassionate care for healing from traumatic experiences',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop',
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
      icon: Shield,
      stats: { sessions: '2,100+', success: '89%', duration: '12-20 weeks' },
      benefits: ['EMDR therapy', 'Trauma-focused CBT', 'Safe space processing', 'Coping strategies'],
      slug: 'trauma-ptsd'
    },
    {
      id: 'addiction',
      query: 'addiction recovery help',
      title: 'Addiction Recovery',
      description: 'Comprehensive support for overcoming substance and behavioral addictions',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
      color: 'from-amber-500 to-red-500',
      bgGradient: 'from-amber-500/20 via-red-500/10 to-transparent',
      icon: Zap,
      stats: { sessions: '1,500+', success: '85%', duration: '16-24 weeks' },
      benefits: ['12-step programs', 'Relapse prevention', 'Family therapy', 'Aftercare planning'],
      slug: 'addiction-recovery'
    }
  ];

  // Typing animation effect
  useEffect(() => {
    const currentQuery = programs[activeProgram].query;
    let charIndex = 0;

    if (isTyping) {
      setSearchText('');
      const typingInterval = setInterval(() => {
        if (charIndex <= currentQuery.length) {
          setSearchText(currentQuery.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => setIsTyping(false), 2000); // Pause before changing
        }
      }, 80);

      return () => clearInterval(typingInterval);
    }
  }, [activeProgram, isTyping]);

  // Auto-rotate programs
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveProgram((prev) => {
        const next = (prev + 1) % programs.length;
        setIsTyping(true);
        return next;
      });
    }, 6000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleProgramClick = (index) => {
    clearInterval(intervalRef.current);
    setActiveProgram(index);
    setIsTyping(true);
    
    // Restart auto-rotation
    intervalRef.current = setInterval(() => {
      setActiveProgram((prev) => {
        const next = (prev + 1) % programs.length;
        setIsTyping(true);
        return next;
      });
    }, 6000);
  };

  const currentProgram = programs[activeProgram];
  const Icon = currentProgram.icon;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProgram}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 bg-gradient-to-br ${currentProgram.bgGradient} blur-3xl`}
          />
        </AnimatePresence>
        
        {/* Floating orbs */}
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Interactive Search & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full mb-6 border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-primary-400 mr-2" />
              <span className="text-sm font-medium text-white">AI-Powered Mental Health Care</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find the right
              <span className="block mt-2">
                <span className={`bg-gradient-to-r ${currentProgram.color} bg-clip-text text-transparent`}>
                  therapy for you
                </span>
              </span>
            </h1>

            {/* Interactive Search Bar */}
            <div className="relative mb-8">
              <div className="glass backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentProgram.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">What brings you here today?</div>
                    <div className="text-lg font-medium text-white min-h-[28px]">
                      {searchText}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-0.5 h-5 bg-primary-500 ml-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${currentProgram.color} bg-clip-text text-transparent`}>
                      {currentProgram.stats.sessions}
                    </div>
                    <div className="text-xs text-gray-400">Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${currentProgram.color} bg-clip-text text-transparent`}>
                      {currentProgram.stats.success}
                    </div>
                    <div className="text-xs text-gray-400">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${currentProgram.color} bg-clip-text text-transparent`}>
                      {currentProgram.stats.duration}
                    </div>
                    <div className="text-xs text-gray-400">Duration</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProgram}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-3 mb-8"
              >
                {currentProgram.benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-white/90"
                  >
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${currentProgram.color} flex items-center justify-center flex-shrink-0`}>
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={`/programs/${currentProgram.slug}`}>
                <Button size="lg" className={`bg-gradient-to-r ${currentProgram.color} hover:opacity-90 border-0 shadow-lg`}>
                  Learn More <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/book-appointment">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Book Session
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Visual Showcase */}
          <div className="relative">
            {/* Main Program Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProgram}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative"
              >
                <div className="relative glass backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  {/* Person Image */}
                  <div className="relative h-96 rounded-2xl overflow-hidden mb-6">
                    <motion.img
                      src={currentProgram.image}
                      alt={currentProgram.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${currentProgram.bgGradient}`} />
                  </div>

                  {/* Program Info Card */}
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-white mb-2">{currentProgram.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{currentProgram.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: currentProgram.stats.success }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`h-full bg-gradient-to-r ${currentProgram.color} rounded-full`}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-2">Success Rate: {currentProgram.stats.success}</div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 glass backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/20"
                >
                  <div className="text-xs text-gray-400">Expert Therapists</div>
                  <div className="text-2xl font-bold text-white">15+ Years</div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Program Selector Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {programs.map((program, index) => (
                <button
                  key={program.id}
                  onClick={() => handleProgramClick(index)}
                  className={`group relative transition-all ${
                    index === activeProgram ? 'w-12' : 'w-3'
                  } h-3 rounded-full`}
                  aria-label={`View ${program.title}`}
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-all ${
                      index === activeProgram
                        ? `bg-gradient-to-r ${program.color}`
                        : 'bg-white/30 group-hover:bg-white/50'
                    }`}
                  />
                  {index === activeProgram && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-full border-2 border-white/50"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent" />
    </section>
  );
};

export default InteractiveHeroShowcase;
