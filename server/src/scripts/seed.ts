import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.notification.deleteMany();
  await prisma.aIReport.deleteMany();
  await prisma.aIMessage.deleteMany();
  await prisma.aISession.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.blogComment.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.blogCategory.deleteMany();
  await prisma.blogTag.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.therapyProgram.deleteMany();
  await prisma.sEOMeta.deleteMany();
  await prisma.patientProfile.deleteMany();
  await prisma.doctorProfile.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 12);

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      email: 'admin@hopeclinic.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      phone: '+1234567890',
      isActive: true,
      isVerified: true
    }
  });
  console.log('✅ Created admin user');

  // Create Doctor
  const doctor = await prisma.user.create({
    data: {
      email: 'dr.bharat@hopeclinic.com',
      password: hashedPassword,
      firstName: 'Dr. Bharat',
      lastName: 'Agarwal',
      role: 'DOCTOR',
      phone: '+1234567891',
      isActive: true,
      isVerified: true,
      doctorProfile: {
        create: {
          specialization: 'Clinical Psychology & Mental Health',
          qualification: 'MBBS, MD (Psychiatry), PhD (Clinical Psychology)',
          experience: 15,
          bio: 'Dr. Bharat Agarwal is a renowned mental health professional with over 15 years of experience in treating various mental health conditions. He specializes in cognitive behavioral therapy, mindfulness techniques, and holistic healing approaches.',
          consultationFee: 150,
          availableDays: JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
          availableHours: JSON.stringify({ start: '16:00', end: '20:00' }),
          hospitalSchedule: JSON.stringify({ days: ['Monday', 'Wednesday', 'Friday'], hours: { start: '09:00', end: '14:00' } })
        }
      }
    }
  });
  console.log('✅ Created doctor');

  // Create Clinic Staff
  const staff = await prisma.user.create({
    data: {
      email: 'staff@hopeclinic.com',
      password: hashedPassword,
      firstName: 'Priya',
      lastName: 'Sharma',
      role: 'CLINIC_STAFF',
      phone: '+1234567892',
      isActive: true,
      isVerified: true
    }
  });
  console.log('✅ Created clinic staff');

  // Create Sample Patients
  const patient1 = await prisma.user.create({
    data: {
      email: 'patient1@example.com',
      password: hashedPassword,
      firstName: 'Rajesh',
      lastName: 'Kumar',
      role: 'PATIENT',
      phone: '+1234567893',
      isActive: true,
      isVerified: true,
      patientProfile: {
        create: {
          dateOfBirth: new Date('1990-05-15'),
          gender: 'Male',
          city: 'Mumbai',
          state: 'Maharashtra',
          consentAIChat: true,
          consentDataShare: true
        }
      }
    }
  });

  const patient2 = await prisma.user.create({
    data: {
      email: 'patient2@example.com',
      password: hashedPassword,
      firstName: 'Anita',
      lastName: 'Verma',
      role: 'PATIENT',
      phone: '+1234567894',
      isActive: true,
      isVerified: true,
      patientProfile: {
        create: {
          dateOfBirth: new Date('1985-08-22'),
          gender: 'Female',
          city: 'Delhi',
          state: 'Delhi',
          consentAIChat: true,
          consentDataShare: true
        }
      }
    }
  });
  console.log('✅ Created sample patients');

  // Create Therapy Programs
  const programs = await prisma.therapyProgram.createMany({
    data: [
      {
        title: 'Depression & Anxiety Treatment',
        slug: 'depression-anxiety',
        description: 'Comprehensive therapy for managing depression and anxiety disorders using evidence-based techniques.',
        icon: '🧠',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
        benefits: JSON.stringify(['Reduced symptoms', 'Better coping skills', 'Improved quality of life', 'Professional support']),
        whoItsFor: JSON.stringify(['Adults feeling depressed', 'People with anxiety', 'Those seeking mental peace']),
        duration: '8-12 weeks',
        price: 120,
        order: 1
      },
      {
        title: 'Relationship & Marriage Counseling',
        slug: 'relationship-counseling',
        description: 'Professional guidance to improve communication, resolve conflicts, and strengthen relationships.',
        icon: '❤️',
        image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800',
        benefits: JSON.stringify(['Better communication', 'Conflict resolution', 'Stronger bond', 'Understanding partner better']),
        whoItsFor: JSON.stringify(['Couples facing issues', 'Pre-marital counseling', 'Those wanting to improve relationship']),
        duration: '6-10 weeks',
        price: 150,
        order: 2
      },
      {
        title: 'Addiction Recovery Program',
        slug: 'addiction-recovery',
        description: 'Holistic approach to overcome substance abuse and behavioral addictions with ongoing support.',
        icon: '🚫',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
        benefits: JSON.stringify(['Breaking addiction cycle', 'Relapse prevention', 'Life skills training', 'Family support']),
        whoItsFor: JSON.stringify(['Substance abuse patients', 'Gaming/internet addicts', 'Those seeking sobriety']),
        duration: '12-16 weeks',
        price: 180,
        order: 3
      },
      {
        title: 'Sexual Health & Intimacy Therapy',
        slug: 'sexual-health',
        description: 'Confidential therapy for sexual health concerns, intimacy issues, and relationship dynamics.',
        icon: '💑',
        image: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800',
        benefits: JSON.stringify(['Open communication', 'Addressing concerns', 'Improved intimacy', 'Professional guidance']),
        whoItsFor: JSON.stringify(['Couples with intimacy issues', 'Individuals with concerns', 'Those seeking better connection']),
        duration: '6-8 weeks',
        price: 140,
        order: 4
      },
      {
        title: 'Stress & Work-Life Balance',
        slug: 'stress-management',
        description: 'Learn effective stress management techniques and achieve better work-life balance.',
        icon: '⚖️',
        image: 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=800',
        benefits: JSON.stringify(['Stress reduction', 'Time management', 'Better focus', 'Improved health']),
        whoItsFor: JSON.stringify(['Working professionals', 'Students', 'Anyone feeling overwhelmed']),
        duration: '4-6 weeks',
        price: 100,
        order: 5
      }
    ]
  });
  console.log('✅ Created therapy programs');

  // Create Blog Categories
  const categories = await prisma.blogCategory.createMany({
    data: [
      { name: 'Mental Health', slug: 'mental-health', description: 'Articles about mental wellness' },
      { name: 'Therapy Tips', slug: 'therapy-tips', description: 'Practical therapy advice' },
      { name: 'Self Care', slug: 'self-care', description: 'Self-care strategies and techniques' },
      { name: 'Relationships', slug: 'relationships', description: 'Relationship advice and insights' }
    ]
  });

  const categoryList = await prisma.blogCategory.findMany();
  console.log('✅ Created blog categories');

  // Create Blog Tags
  await prisma.blogTag.createMany({
    data: [
      { name: 'Anxiety', slug: 'anxiety' },
      { name: 'Depression', slug: 'depression' },
      { name: 'Mindfulness', slug: 'mindfulness' },
      { name: 'Therapy', slug: 'therapy' },
      { name: 'Self Help', slug: 'self-help' }
    ]
  });
  console.log('✅ Created blog tags');

  // Create Sample Blogs
  const blog1 = await prisma.blog.create({
    data: {
      title: '10 Signs You Might Need Therapy',
      slug: '10-signs-you-might-need-therapy',
      excerpt: 'Recognizing when to seek professional help is crucial for mental health. Here are 10 signs that indicate you might benefit from therapy.',
      content: `Mental health is just as important as physical health. Sometimes, we need professional help to navigate life's challenges. Here are 10 signs that you might benefit from therapy:\n\n1. **Persistent feelings of sadness or hopelessness** - If you've been feeling down for weeks or months, therapy can help.\n\n2. **Difficulty managing daily tasks** - When everyday activities feel overwhelming, it's time to reach out.\n\n3. **Relationship problems** - If conflicts are affecting your relationships, therapy can provide tools to improve communication.\n\n4. **Trauma or loss** - Processing grief and trauma with a professional can aid healing.\n\n5. **Substance use concerns** - If you're using substances to cope, therapy can address underlying issues.\n\n6. **Anxiety that interferes with life** - Persistent worry or panic attacks warrant professional support.\n\n7. **Changes in sleep or appetite** - These can be signs of depression or anxiety.\n\n8. **Feeling disconnected or numb** - Therapy can help you reconnect with your emotions.\n\n9. **Thoughts of self-harm** - This requires immediate professional help.\n\n10. **Want to understand yourself better** - Therapy isn't just for crises; it's also for personal growth.\n\nAt Hope Clinic, Dr. Bharat Agarwal and our team are here to support you on your mental health journey.`,
      authorId: doctor.id,
      status: 'PUBLISHED',
      isPublished: true,
      publishedAt: new Date(),
      featuredImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
      metaTitle: '10 Signs You Might Need Therapy | Hope Clinic',
      metaDescription: 'Learn the key signs that indicate you might benefit from professional therapy and mental health support.',
      categories: {
        connect: [{ id: categoryList[0].id }]
      }
    }
  });

  await prisma.blog.create({
    data: {
      title: 'Understanding Anxiety: Symptoms and Treatment',
      slug: 'understanding-anxiety-symptoms-treatment',
      excerpt: 'Anxiety is one of the most common mental health conditions. Learn about its symptoms, causes, and effective treatment options.',
      content: `Anxiety affects millions of people worldwide. Understanding it is the first step toward managing it effectively.\n\n## What is Anxiety?\n\nAnxiety is your body's natural response to stress. It's a feeling of fear or apprehension about what's to come. However, when anxiety becomes persistent and overwhelming, it can interfere with daily life.\n\n## Common Symptoms\n\n- Excessive worrying\n- Restlessness or feeling on edge\n- Difficulty concentrating\n- Irritability\n- Muscle tension\n- Sleep disturbances\n- Physical symptoms like rapid heartbeat, sweating, trembling\n\n## Treatment Options\n\n### Cognitive Behavioral Therapy (CBT)\nCBT helps identify and change negative thought patterns that contribute to anxiety.\n\n### Mindfulness and Relaxation Techniques\nPractices like meditation, deep breathing, and progressive muscle relaxation can reduce anxiety symptoms.\n\n### Medication\nIn some cases, medication may be prescribed alongside therapy.\n\n### Lifestyle Changes\nRegular exercise, adequate sleep, and a healthy diet can significantly impact anxiety levels.\n\n## When to Seek Help\n\nIf anxiety is interfering with your daily life, relationships, or work, it's time to seek professional help. At Hope Clinic, we offer specialized anxiety treatment programs tailored to your needs.\n\nContact us today to schedule a consultation with Dr. Bharat Agarwal.`,
      authorId: doctor.id,
      status: 'PUBLISHED',
      isPublished: true,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      featuredImage: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800',
      metaTitle: 'Understanding Anxiety: Symptoms and Treatment | Hope Clinic',
      metaDescription: 'Comprehensive guide to anxiety symptoms, causes, and treatment options including CBT and mindfulness techniques.',
      categories: {
        connect: [{ id: categoryList[0].id }, { id: categoryList[1].id }]
      }
    }
  });
  console.log('✅ Created sample blogs');

  // Create Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Meera Patel',
        rating: 5,
        message: 'Dr. Bharat\'s therapy sessions have been life-changing for me. His empathetic approach and practical techniques helped me overcome my anxiety. I feel like a new person!',
        location: 'Mumbai, India',
        program: 'Depression & Anxiety Treatment',
        isApproved: true,
        isFeatured: true
      },
      {
        name: 'Vikram Singh',
        rating: 5,
        message: 'The addiction recovery program at Hope Clinic saved my life. The support and guidance I received were exceptional. I\'ve been sober for 8 months now and feeling stronger every day.',
        location: 'Delhi, India',
        program: 'Addiction Recovery Program',
        isApproved: true,
        isFeatured: true
      },
      {
        name: 'Priya & Amit Sharma',
        rating: 5,
        message: 'Our marriage was on the rocks, but relationship counseling at Hope Clinic helped us reconnect. Dr. Bharat provided tools and insights that transformed our communication. We\'re grateful!',
        location: 'Bangalore, India',
        program: 'Relationship & Marriage Counseling',
        isApproved: true,
        isFeatured: true
      }
    ]
  });
  console.log('✅ Created testimonials');

  // Create Sample Appointments
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(17, 0, 0, 0);

  await prisma.appointment.create({
    data: {
      patientId: patient1.id,
      appointmentType: 'INITIAL_CONSULTATION',
      appointmentDate: tomorrow,
      startTime: '17:00',
      endTime: '18:00',
      status: 'SCHEDULED',
      isOnline: true,
      meetingPlatform: 'google-meet',
      meetingUrl: 'https://meet.google.com/abc-defg-hij',
      reasonForVisit: 'Feeling anxious and stressed',
      notes: 'First-time consultation'
    }
  });

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(18, 0, 0, 0);

  await prisma.appointment.create({
    data: {
      patientId: patient2.id,
      appointmentType: 'THERAPY_SESSION',
      appointmentDate: nextWeek,
      startTime: '18:00',
      endTime: '19:00',
      status: 'SCHEDULED',
      isOnline: false,
      reasonForVisit: 'Follow-up therapy session',
      notes: 'Regular session'
    }
  });
  console.log('✅ Created sample appointments');

  // Create SEO Meta
  await prisma.sEOMeta.createMany({
    data: [
      {
        page: 'home',
        title: 'Hope Clinic - Professional Mental Health Services in India',
        description: 'Expert mental health therapy and counseling services by Dr. Bharat Agarwal. Online and offline consultations available. Depression, anxiety, addiction, relationship counseling.',
        keywords: 'mental health, therapy, counseling, psychiatrist, psychologist, depression, anxiety, India',
        ogTitle: 'Hope Clinic - Mental Health Services',
        ogDescription: 'Professional mental health therapy by experienced psychiatrist Dr. Bharat Agarwal',
        ogImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
        canonical: 'https://hopeclinic.com'
      },
      {
        page: 'about',
        title: 'About Hope Clinic - Meet Dr. Bharat Agarwal',
        description: 'Learn about Hope Clinic and Dr. Bharat Agarwal, a renowned mental health professional with 15+ years of experience in treating various mental health conditions.',
        keywords: 'Dr. Bharat Agarwal, psychiatrist, mental health expert, Hope Clinic',
        ogTitle: 'About Hope Clinic & Dr. Bharat Agarwal',
        ogDescription: 'Experienced mental health professional dedicated to your wellbeing'
      }
    ]
  });
  console.log('✅ Created SEO meta tags');

  // Create Settings
  await prisma.setting.createMany({
    data: [
      { key: 'clinic_name', value: 'Hope Clinic', type: 'string', category: 'general' },
      { key: 'clinic_phone', value: '+91-9876543210', type: 'string', category: 'contact' },
      { key: 'clinic_email', value: 'info@hopeclinic.com', type: 'string', category: 'contact' },
      { key: 'clinic_address', value: '123 Mental Wellness Street, Mumbai, India', type: 'string', category: 'contact' },
      { key: 'whatsapp_number', value: '+919876543210', type: 'string', category: 'contact' },
      { key: 'appointment_duration', value: '60', type: 'number', category: 'appointments' },
      { key: 'enable_online_booking', value: 'true', type: 'boolean', category: 'appointments' }
    ]
  });
  console.log('✅ Created settings');

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📝 Sample Login Credentials:');
  console.log('Admin: admin@hopeclinic.com / password123');
  console.log('Doctor: dr.bharat@hopeclinic.com / password123');
  console.log('Staff: staff@hopeclinic.com / password123');
  console.log('Patient: patient1@example.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
