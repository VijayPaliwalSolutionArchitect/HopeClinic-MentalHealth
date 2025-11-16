import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../config/prisma';
import { AppError } from '../middlewares/errorHandler';
import { sendAppointmentEmail } from '../services/emailService';
import { generateMeetingLink } from '../services/meetingService';

export const getAllAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, date, isOnline, page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (date) {
      const startDate = new Date(date as string);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      where.appointmentDate = {
        gte: startDate,
        lt: endDate
      };
    }

    if (isOnline !== undefined) {
      where.isOnline = isOnline === 'true';
    }

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        skip,
        take: Number(limit),
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
        orderBy: { appointmentDate: 'desc' }
      }),
      prisma.appointment.count({ where })
    ]);

    res.json({
      success: true,
      data: appointments,
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

export const getMyAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const { status, upcoming } = req.query;

    const where: any = { patientId: userId };

    if (status) {
      where.status = status;
    }

    if (upcoming === 'true') {
      where.appointmentDate = {
        gte: new Date()
      };
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: { appointmentDate: 'asc' }
    });

    res.json({
      success: true,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

export const getAvailableSlots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date } = req.query;

    if (!date) {
      throw new AppError('Date is required', 400);
    }

    const requestedDate = new Date(date as string);
    const dayName = requestedDate.toLocaleDateString('en-US', { weekday: 'long' });

    // Get doctor profile (assuming single doctor for now)
    const doctorProfile = await prisma.doctorProfile.findFirst();

    if (!doctorProfile) {
      throw new AppError('Doctor profile not found', 404);
    }

    const availableDays = JSON.parse(doctorProfile.availableDays);
    const availableHours = JSON.parse(doctorProfile.availableHours);

    // Check if doctor is available on this day
    if (!availableDays.includes(dayName)) {
      return res.json({
        success: true,
        data: [],
        message: 'Doctor not available on this day'
      });
    }

    // Check for blocked days
    const blockedDay = await prisma.calendarBlock.findFirst({
      where: {
        date: {
          gte: new Date(requestedDate.setHours(0, 0, 0, 0)),
          lt: new Date(requestedDate.setHours(23, 59, 59, 999))
        }
      }
    });

    if (blockedDay) {
      return res.json({
        success: true,
        data: [],
        message: blockedDay.reason
      });
    }

    // Generate time slots
    const slots = [];
    const startHour = parseInt(availableHours.start.split(':')[0]);
    const endHour = parseInt(availableHours.end.split(':')[0]);

    // Get existing appointments for this date
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        appointmentDate: {
          gte: new Date(new Date(date as string).setHours(0, 0, 0, 0)),
          lt: new Date(new Date(date as string).setHours(23, 59, 59, 999))
        },
        status: { not: 'CANCELLED' }
      }
    });

    const bookedSlots = existingAppointments.map(apt => apt.startTime);

    for (let hour = startHour; hour < endHour; hour++) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
      if (!bookedSlots.includes(timeSlot)) {
        slots.push({
          time: timeSlot,
          available: true
        });
      }
    }

    res.json({
      success: true,
      data: slots
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    const appointment = await prisma.appointment.findUnique({
      where: { id },
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
      }
    });

    if (!appointment) {
      throw new AppError('Appointment not found', 404);
    }

    // Check permission
    if (userRole === 'PATIENT' && appointment.patientId !== userId) {
      throw new AppError('Unauthorized', 403);
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = (req as any).user.id;
    const {
      appointmentDate,
      startTime,
      endTime,
      appointmentType,
      isOnline,
      meetingPlatform,
      reasonForVisit,
      notes
    } = req.body;

    // Check if slot is available
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        appointmentDate: new Date(appointmentDate),
        startTime,
        status: { not: 'CANCELLED' }
      }
    });

    if (existingAppointment) {
      throw new AppError('Time slot already booked', 400);
    }

    // Calculate end time if not provided
    const calculatedEndTime = endTime || (
      `${(parseInt(startTime.split(':')[0]) + 1).toString().padStart(2, '0')}:00`
    );

    // Generate meeting link if online
    let meetingUrl = null;
    if (isOnline && meetingPlatform) {
      meetingUrl = await generateMeetingLink(meetingPlatform, {
        title: `Appointment - ${appointmentType}`,
        date: appointmentDate,
        time: startTime
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId: userId,
        appointmentDate: new Date(appointmentDate),
        startTime,
        endTime: calculatedEndTime,
        appointmentType,
        isOnline,
        meetingPlatform,
        meetingUrl,
        reasonForVisit,
        notes,
        status: 'SCHEDULED'
      },
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

    // Send confirmation email
    await sendAppointmentEmail(appointment);

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const appointment = await prisma.appointment.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

export const cancelAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { cancelReason } = req.body;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    const appointment = await prisma.appointment.findUnique({
      where: { id }
    });

    if (!appointment) {
      throw new AppError('Appointment not found', 404);
    }

    if (userRole === 'PATIENT' && appointment.patientId !== userId) {
      throw new AppError('Unauthorized', 403);
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelReason,
        cancelledBy: userId
      }
    });

    res.json({
      success: true,
      data: updatedAppointment
    });
  } catch (error) {
    next(error);
  }
};

export const markAttended = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        attended: true,
        status: 'COMPLETED'
      }
    });

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await prisma.appointment.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};