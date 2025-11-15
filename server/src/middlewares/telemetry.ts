import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';

export const telemetryMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on('finish', async () => {
    const duration = Date.now() - start;
    const userId = (req as any).user?.id;

    // Log significant activities
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
      try {
        await prisma.activityLog.create({
          data: {
            userId: userId || null,
            action: `${req.method} ${req.path}`,
            details: JSON.stringify({
              body: req.body,
              params: req.params,
              query: req.query,
              statusCode: res.statusCode,
              duration
            }),
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
          }
        });
      } catch (error) {
        console.error('Telemetry logging failed:', error);
      }
    }
  });

  next();
};