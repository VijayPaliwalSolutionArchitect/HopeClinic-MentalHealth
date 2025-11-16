import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = async (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = (err as AppError).statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log to database
  try {
    await prisma.exceptionLog.create({
      data: {
        source: 'backend',
        level: statusCode >= 500 ? 'critical' : 'error',
        message: message,
        stackTrace: err.stack,
        payload: JSON.stringify({
          method: req.method,
          url: req.url,
          body: req.body,
          params: req.params,
          query: req.query
        }),
        userAgent: req.get('user-agent'),
        userId: (req as any).user?.id,
        url: req.url
      }
    });
  } catch (logError) {
    console.error('Failed to log exception:', logError);
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};