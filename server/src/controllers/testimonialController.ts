import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../config/prisma';
import { AppError } from '../middlewares/errorHandler';

export const getAllTestimonials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { approved = 'true', featured, limit = 20 } = req.query;

    const where: any = {};

    if (approved === 'true') {
      where.isApproved = true;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    const testimonials = await prisma.testimonial.findMany({
      where,
      take: Number(limit),
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (
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
    const { name, message, rating, program, location } = req.body;

    const testimonial = await prisma.testimonial.create({
      data: {
        patientId: userId,
        name,
        message,
        rating,
        program,
        location
      }
    });

    res.status(201).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    next(error);
  }
};

export const approveTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: { isApproved: true }
    });

    res.json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await prisma.testimonial.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};