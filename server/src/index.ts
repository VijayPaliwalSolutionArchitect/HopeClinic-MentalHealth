import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { errorHandler } from './middlewares/errorHandler';
import { telemetryMiddleware } from './middlewares/telemetry';

// Import routes
import authRoutes from './routes/auth';
import googleAuthRoutes from './routes/googleAuth';
import userRoutes from './routes/users';
import appointmentRoutes from './routes/appointments';
import aiChatRoutes from './routes/aiChat';
import blogRoutes from './routes/blogs';
import testimonialRoutes from './routes/testimonials';
import inquiryRoutes from './routes/inquiries';
import programRoutes from './routes/programs';
import settingRoutes from './routes/settings';
import telemetryRoutes from './routes/telemetry';
import healthRoutes from './routes/health';
import dashboardRoutes from './routes/dashboard';
import seoRoutes from './routes/seo';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Telemetry middleware
app.use(telemetryMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/ai-chat', aiChatRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/seo', seoRoutes);

// Health check
app.get('/api', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Hope Clinic API Server', 
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Hope Clinic Server running on port ${PORT}`);
  console.log(`🌐 Client URL: ${process.env.CLIENT_URL}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

export default app;