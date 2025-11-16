import express from 'express';
import prisma from '../config/prisma';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'operational',
        api: 'operational'
      }
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      error: 'Database connection failed'
    });
  }
});

export default router;