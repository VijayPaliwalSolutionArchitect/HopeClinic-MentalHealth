import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const mentalHealthPrograms = [
  {
    title: 'Anxiety & Stress Management',
    slug: 'anxiety-stress-management',
    description: 'Comprehensive therapy for managing anxiety disorders, panic attacks, and chronic stress using CBT and mindfulness techniques.',
    icon: '😰',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    benefits: JSON.stringify(['Reduced anxiety symptoms', 'Better stress coping', 'Improved sleep', 'Enhanced focus']),
    whoItsFor: JSON.stringify(['Anxiety disorder patients', 'High-stress professionals', 'Students', 'Anyone feeling overwhelmed']),
    duration: '8-12 weeks',
    price: 120,
    order: 1
  },
  {
    title: 'Depression Treatment & Support',
    slug: 'depression-treatment',
    description: 'Evidence-based treatment for depression including cognitive behavioral therapy and holistic healing approaches.',
    icon: '😔',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
    benefits: JSON.stringify(['Mood improvement', 'Energy restoration', 'Better self-esteem', 'Life purpose clarity']),
    whoItsFor: JSON.stringify(['Depression patients', 'People feeling hopeless', 'Those with low energy', 'Anyone struggling with sadness']),
    duration: '10-16 weeks',
    price: 130,
    order: 2
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
    title: 'Addiction Recovery Program',
    slug: 'addiction-recovery',
    description: 'Holistic approach to overcome substance abuse and behavioral addictions with ongoing support.',
    icon: '🚫',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
    benefits: JSON.stringify(['Breaking addiction cycle', 'Relapse prevention', 'Life skills training', 'Family support']),
    whoItsFor: JSON.stringify(['Substance abuse patients', 'Gaming/internet addicts', 'Those seeking sobriety']),
    duration: '12-16 weeks',
    price: 180,
    order: 5
  },
  {
    title: 'Work-Life Balance & Career Stress',
    slug: 'work-life-balance',
    description: 'Learn effective stress management techniques and achieve better work-life balance for optimal wellbeing.',
    icon: '⚖️',
    image: 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=800',
    benefits: JSON.stringify(['Stress reduction', 'Time management', 'Better focus', 'Improved health', 'Career clarity']),
    whoItsFor: JSON.stringify(['Working professionals', 'Entrepreneurs', 'Students', 'Anyone feeling burned out']),
    duration: '6-8 weeks',
    price: 110,
    order: 6
  },
  {
    title: 'Trauma & PTSD Treatment',
    slug: 'trauma-ptsd',
    description: 'Specialized therapy for trauma survivors and PTSD using EMDR, CBT, and trauma-focused approaches.',
    icon: '🩹',
    image: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800',
    benefits: JSON.stringify(['Trauma processing', 'PTSD symptom relief', 'Emotional healing', 'Safe coping strategies']),
    whoItsFor: JSON.stringify(['Trauma survivors', 'PTSD patients', 'Abuse survivors', 'Those with traumatic memories']),
    duration: '12-20 weeks',
    price: 160,
    order: 7
  },
  {
    title: 'OCD & Obsessive Thoughts',
    slug: 'ocd-treatment',
    description: 'Specialized treatment for Obsessive-Compulsive Disorder using exposure therapy and cognitive restructuring.',
    icon: '🔄',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    benefits: JSON.stringify(['Reduced compulsions', 'Thought control', 'Anxiety management', 'Normal daily functioning']),
    whoItsFor: JSON.stringify(['OCD patients', 'Those with intrusive thoughts', 'People with repetitive behaviors']),
    duration: '10-14 weeks',
    price: 140,
    order: 8
  },
  {
    title: 'Personality Disorders Support',
    slug: 'personality-disorders',
    description: 'Comprehensive support for personality disorders including DBT and schema therapy approaches.',
    icon: '🎭',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    benefits: JSON.stringify(['Emotional regulation', 'Better relationships', 'Self-awareness', 'Coping skills']),
    whoItsFor: JSON.stringify(['Personality disorder patients', 'Those with emotional dysregulation', 'Relationship struggles']),
    duration: '16-24 weeks',
    price: 170,
    order: 9
  },
  {
    title: 'Eating Disorders Treatment',
    slug: 'eating-disorders',
    description: 'Specialized treatment for anorexia, bulimia, binge eating, and other eating disorders.',
    icon: '🍽️',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
    benefits: JSON.stringify(['Healthy eating patterns', 'Body image improvement', 'Emotional healing', 'Nutritional guidance']),
    whoItsFor: JSON.stringify(['Eating disorder patients', 'Body image issues', 'Disordered eating patterns']),
    duration: '12-20 weeks',
    price: 155,
    order: 10
  }
];

async function main() {
  console.log('🌱 Starting enhanced database seeding...');

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

  // Create Users
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
          bio: 'Dr. Bharat Agarwal is a renowned mental health professional with over 15 years of experience.',
          consultationFee: 150,
          availableDays: JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
          availableHours: JSON.stringify({ start: '16:00', end: '20:00' })
        }
      }
    }
  });

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
          consentAIChat: true
        }
      }
    }
  });

  console.log('✅ Created users');

  // Create Therapy Programs
  for (const program of mentalHealthPrograms) {
    await prisma.therapyProgram.create({ data: program });
  }
  console.log('✅ Created 10 therapy programs');

  // Create Blog Categories & Tags
  const categories = await Promise.all([
    prisma.blogCategory.create({ data: { name: 'Mental Health', slug: 'mental-health' }}),
    prisma.blogCategory.create({ data: { name: 'Therapy Tips', slug: 'therapy-tips' }}),
    prisma.blogCategory.create({ data: { name: 'Self Care', slug: 'self-care' }}),
    prisma.blogCategory.create({ data: { name: 'Relationships', slug: 'relationships' }}),
    prisma.blogCategory.create({ data: { name: 'Wellness', slug: 'wellness' }})
  ]);

  await Promise.all([
    prisma.blogTag.create({ data: { name: 'Anxiety', slug: 'anxiety' }}),
    prisma.blogTag.create({ data: { name: 'Depression', slug: 'depression' }}),
    prisma.blogTag.create({ data: { name: 'Mindfulness', slug: 'mindfulness' }}),
    prisma.blogTag.create({ data: { name: 'Therapy', slug: 'therapy' }}),
    prisma.blogTag.create({ data: { name: 'Self Help', slug: 'self-help' }})
  ]);

  console.log('✅ Created categories and tags');

  // Create 20 Blogs
  const blogTitles = [
    { title: '10 Signs You Might Need Therapy', excerpt: 'Recognizing when to seek professional help is crucial for mental health.' },
    { title: 'Understanding Anxiety: Symptoms and Treatment', excerpt: 'Learn about anxiety symptoms, causes, and effective treatment options.' },
    { title: 'Overcoming Depression: A Comprehensive Guide', excerpt: 'Practical strategies and professional treatments for managing depression.' },
    { title: 'The Power of Mindfulness in Mental Health', excerpt: 'Discover how mindfulness practices can transform your mental wellbeing.' },
    { title: 'Building Healthy Relationships: Communication Tips', excerpt: 'Essential communication skills for stronger, healthier relationships.' },
    { title: 'Managing Stress at Work: Practical Strategies', excerpt: 'Effective techniques to handle workplace stress and prevent burnout.' },
    { title: 'Self-Care Isn\'t Selfish: Why It Matters', excerpt: 'Understanding the importance of self-care in maintaining mental health.' },
    { title: 'Breaking the Stigma Around Mental Health', excerpt: 'Why we need to talk openly about mental health and seek help.' },
    { title: 'Cognitive Behavioral Therapy: How It Works', excerpt: 'An in-depth look at CBT and its effectiveness in treating mental health issues.' },
    { title: 'Dealing with Grief and Loss', excerpt: 'Navigating the complex emotions of grief and finding healthy ways to cope.' },
    { title: 'Social Anxiety: Understanding and Treatment', excerpt: 'What social anxiety is and how to manage it effectively.' },
    { title: 'The Impact of Sleep on Mental Health', excerpt: 'How quality sleep affects your mental wellbeing and mood.' },
    { title: 'Parenting and Mental Health', excerpt: 'Balancing parenting responsibilities while maintaining your mental health.' },
    { title: 'Digital Detox for Better Mental Health', excerpt: 'The benefits of taking breaks from technology for mental wellness.' },
    { title: 'Understanding Trauma and Its Effects', excerpt: 'How trauma impacts mental health and the path to healing.' },
    { title: 'Building Resilience in Difficult Times', excerpt: 'Developing mental strength to bounce back from challenges.' },
    { title: 'The Connection Between Exercise and Mental Health', excerpt: 'How physical activity improves mood and reduces anxiety.' },
    { title: 'Setting Boundaries for Better Mental Health', excerpt: 'Why boundaries are essential and how to set them effectively.' },
    { title: 'Meditation for Beginners: A Mental Health Guide', excerpt: 'Starting your meditation practice for improved mental wellbeing.' },
    { title: 'Recognizing and Managing Panic Attacks', excerpt: 'Understanding panic attacks and learning coping strategies.' }
  ];

  for (let i = 0; i < blogTitles.length; i++) {
    await prisma.blog.create({
      data: {
        title: blogTitles[i].title,
        slug: blogTitles[i].title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: blogTitles[i].excerpt,
        content: `# ${blogTitles[i].title}\n\n${blogTitles[i].excerpt}\n\nThis is comprehensive content about the topic. Mental health is a crucial aspect of overall wellbeing...`,
        authorId: doctor.id,
        status: 'PUBLISHED',
        isPublished: true,
        publishedAt: new Date(Date.now() - i * 86400000),
        featuredImage: `https://images.unsplash.com/photo-${1573497019940 + i}?w=800`,
        categories: {
          connect: [{ id: categories[i % categories.length].id }]
        }
      }
    });
  }
  console.log('✅ Created 20 blog posts');

  // Create 10 Testimonials
  const testimonials = [
    { name: 'Priya Sharma', message: 'Dr. Bharat transformed my life. His compassionate approach helped me overcome severe anxiety.', rating: 5, program: 'Anxiety & Stress Management', location: 'Mumbai' },
    { name: 'Rahul Mehta', message: 'The depression treatment program gave me hope when I had none. Forever grateful!', rating: 5, program: 'Depression Treatment', location: 'Delhi' },
    { name: 'Anita & Vikram', message: 'Our marriage was saved through the couples therapy. Dr. Bharat is amazing!', rating: 5, program: 'Relationship Counseling', location: 'Bangalore' },
    { name: 'Sanjay Patel', message: 'After years of addiction, I\'m finally free. The support here is incredible.', rating: 5, program: 'Addiction Recovery', location: 'Pune' },
    { name: 'Meera Iyer', message: 'The trauma therapy helped me heal from my past. I feel like myself again.', rating: 5, program: 'Trauma & PTSD Treatment', location: 'Chennai' },
    { name: 'Arjun Singh', message: 'Work stress was destroying me. The work-life balance program changed everything.', rating: 5, program: 'Work-Life Balance', location: 'Hyderabad' },
    { name: 'Kavita Reddy', message: 'Living with OCD was exhausting. Now I have control over my thoughts. Thank you!', rating: 5, program: 'OCD Treatment', location: 'Kolkata' },
    { name: 'Amit & Pooja', message: 'The sexual health therapy improved our intimacy beyond expectations. Highly recommend!', rating: 5, program: 'Sexual Health Therapy', location: 'Ahmedabad' },
    { name: 'Neha Gupta', message: 'My eating disorder recovery journey was supported every step. I\'m healthy now!', rating: 5, program: 'Eating Disorders Treatment', location: 'Jaipur' },
    { name: 'Rohan Desai', message: 'The AI chat feature provides instant support. Combined with therapy, it\'s perfect!', rating: 5, program: 'Various Programs', location: 'Mumbai' }
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: {
        ...testimonial,
        isApproved: true,
        isFeatured: true
      }
    });
  }
  console.log('✅ Created 10 testimonials');

  console.log('\n🎉 Enhanced database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
