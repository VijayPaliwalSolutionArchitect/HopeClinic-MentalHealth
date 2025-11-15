import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../config/prisma';
import { AppError } from '../middlewares/errorHandler';
import { sendInquiryResponse } from '../services/emailService';

export const createInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, subject, message } = req.body;

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        status: 'NEW'
      }
    });

    // Log notification for admin
    await prisma.notification.create({
      data: {
        userId: 'admin', // You might want to get actual admin ID
        title: 'New Inquiry Received',
        message: `New inquiry from ${name}: ${subject}`,
        type: 'info'
      }
    });

    res.status(201).json({
      success: true,
      data: inquiry,
      message: 'Your inquiry has been submitted. We will get back to you soon!'
    });
  } catch (error) {
    next(error);
  }
};

export const getAllInquiries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};

    if (status) {
      where.status = status;
    }

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.inquiry.count({ where })
    ]);

    res.json({
      success: true,
      data: inquiries,
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

export const getInquiryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const inquiry = await prisma.inquiry.findUnique({
      where: { id }
    });

    if (!inquiry) {
      throw new AppError('Inquiry not found', 404);
    }

    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
};

export const respondToInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        response,
        status: 'REPLIED',
        respondedAt: new Date()
      }
    });

    // Send email response
    await sendInquiryResponse(inquiry, response);

    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
};

export const updateInquiryStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { status }
    });

    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await prisma.inquiry.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};