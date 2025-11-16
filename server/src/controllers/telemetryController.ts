import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { AppError } from '../middlewares/errorHandler';

export const getExceptionLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { level, source, resolved, page = 1, limit = 50 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};

    if (level) {
      where.level = level;
    }

    if (source) {
      where.source = source;
    }

    if (resolved !== undefined) {
      where.resolved = resolved === 'true';
    }

    const [exceptions, total] = await Promise.all([
      prisma.exceptionLog.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.exceptionLog.count({ where })
    ]);

    res.json({
      success: true,
      data: exceptions,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const logException = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { source, level, message, stackTrace, payload, userAgent, url } = req.body;

    const exception = await prisma.exceptionLog.create({
      data: {
        source,
        level,
        message,
        stackTrace,
        payload: payload ? JSON.stringify(payload) : null,
        userAgent,
        url
      }
    });

    res.status(201).json({
      success: true,
      data: exception
    });
  } catch (error) {
    next(error);
  }
};

export const resolveException = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const exception = await prisma.exceptionLog.update({
      where: { id },
      data: {
        resolved: true,
        resolvedBy: userId,
        resolvedAt: new Date()
      }
    });

    res.json({
      success: true,
      data: exception
    });
  } catch (error) {
    next(error);
  }
};

export const getActivityLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, action, entity, page = 1, limit = 50 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (action) {
      where.action = { contains: String(action) };
    }

    if (entity) {
      where.entity = entity;
    }

    const [activities, total] = await Promise.all([
      prisma.activityLog.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.activityLog.count({ where })
    ]);

    res.json({
      success: true,
      data: activities,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const exportData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.query;

    let data: any[] = [];
    let filename = 'export.json';

    switch (type) {
      case 'appointments':
        data = await prisma.appointment.findMany({
          include: {
            patient: {
              select: {
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        });
        filename = 'appointments.json';
        break;

      case 'inquiries':
        data = await prisma.inquiry.findMany();
        filename = 'inquiries.json';
        break;

      case 'exceptions':
        data = await prisma.exceptionLog.findMany();
        filename = 'exceptions.json';
        break;

      case 'activities':
        data = await prisma.activityLog.findMany();
        filename = 'activities.json';
        break;

      default:
        throw new AppError('Invalid export type', 400);
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.json(data);
  } catch (error) {
    next(error);
  }
};