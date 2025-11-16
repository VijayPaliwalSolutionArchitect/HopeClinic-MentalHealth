import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../config/prisma';
import { AppError } from '../middlewares/errorHandler';

export const getAllPrograms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { isActive = 'true' } = req.query;

    const where: any = {};

    if (isActive === 'true') {
      where.isActive = true;
    }

    const programs = await prisma.therapyProgram.findMany({
      where,
      orderBy: { order: 'asc' }
    });

    res.json({
      success: true,
      data: programs
    });
  } catch (error) {
    next(error);
  }
};

export const getProgramById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const program = await prisma.therapyProgram.findUnique({
      where: { id }
    });

    if (!program) {
      throw new AppError('Program not found', 404);
    }

    res.json({
      success: true,
      data: program
    });
  } catch (error) {
    next(error);
  }
};

export const getProgramBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;

    const program = await prisma.therapyProgram.findUnique({
      where: { slug }
    });

    if (!program) {
      throw new AppError('Program not found', 404);
    }

    res.json({
      success: true,
      data: program
    });
  } catch (error) {
    next(error);
  }
};

export const createProgram = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const programData = req.body;

    const program = await prisma.therapyProgram.create({
      data: programData
    });

    res.status(201).json({
      success: true,
      data: program
    });
  } catch (error) {
    next(error);
  }
};

export const updateProgram = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const program = await prisma.therapyProgram.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      data: program
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProgram = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await prisma.therapyProgram.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Program deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};