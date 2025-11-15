import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [totalPatients, totalAppointments, todayAppointments, newInquiries, criticalExceptions, recentBlogs, activeSessions] = await Promise.all([
      prisma.user.count({ where: { role: 'PATIENT' } }),
      prisma.appointment.count(),
      prisma.appointment.count({
        where: {
          appointmentDate: {
            gte: today,
            lt: tomorrow
          }
        }
      }),
      prisma.inquiry.count({
        where: {
          status: 'NEW',
          createdAt: { gte: thirtyDaysAgo }
        }
      }),
      prisma.exceptionLog.count({
        where: {
          level: 'critical',
          resolved: false
        }
      }),
      prisma.blog.count({
        where: {
          isPublished: true,
          publishedAt: { gte: thirtyDaysAgo }
        }
      }),
      prisma.aISession.count({
        where: {
          status: 'ACTIVE'
        }
      })
    ]);

    // Get appointment trends
    const appointmentsByType = await prisma.appointment.groupBy({
      by: ['appointmentType'],
      _count: true
    });

    const appointmentsByStatus = await prisma.appointment.groupBy({
      by: ['status'],
      _count: true
    });

    res.json({
      success: true,
      data: {
        overview: {
          totalPatients,
          totalAppointments,
          todayAppointments,
          newInquiries,
          criticalExceptions,
          recentBlogs,
          activeSessions
        },
        appointmentsByType,
        appointmentsByStatus
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPatientDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const [upcomingAppointments, recentSessions, notifications] = await Promise.all([
      prisma.appointment.findMany({
        where: {
          patientId: userId,
          appointmentDate: { gte: new Date() },
          status: { in: ['SCHEDULED', 'CONFIRMED'] }
        },
        orderBy: { appointmentDate: 'asc' },
        take: 5
      }),
      prisma.aISession.findMany({
        where: { patientId: userId },
        orderBy: { startedAt: 'desc' },
        take: 5,
        include: {
          _count: {
            select: { messages: true }
          }
        }
      }),
      prisma.notification.findMany({
        where: { userId, isRead: false },
        orderBy: { createdAt: 'desc' },
        take: 10
      })
    ]);

    res.json({
      success: true,
      data: {
        upcomingAppointments,
        recentSessions,
        notifications
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctorDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [todayAppointments, pendingSessions, recentReports] = await Promise.all([
      prisma.appointment.findMany({
        where: {
          appointmentDate: {
            gte: today,
            lt: tomorrow
          }
        },
        include: {
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true
            }
          }
        },
        orderBy: { startTime: 'asc' }
      }),
      prisma.aISession.findMany({
        where: {
          status: 'ACTIVE',
          urgencyLevel: { in: ['HIGH', 'CRITICAL'] }
        },
        include: {
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          }
        },
        orderBy: { startedAt: 'desc' }
      }),
      prisma.aIReport.findMany({
        where: {
          reviewedBy: null
        },
        include: {
          session: {
            include: {
              patient: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      })
    ]);

    res.json({
      success: true,
      data: {
        todayAppointments,
        pendingSessions,
        recentReports
      }
    });
  } catch (error) {
    next(error);
  }
};