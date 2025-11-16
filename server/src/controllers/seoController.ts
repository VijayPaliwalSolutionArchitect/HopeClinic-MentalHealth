import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../config/prisma';
import { AppError } from '../middlewares/errorHandler';

export const getAllSEOMeta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const seoMeta = await prisma.sEOMeta.findMany();

    res.json({
      success: true,
      data: seoMeta
    });
  } catch (error) {
    next(error);
  }
};

export const getSEOMetaByPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page } = req.params;

    const seoMeta = await prisma.sEOMeta.findUnique({
      where: { page }
    });

    if (!seoMeta) {
      // Return default SEO meta
      return res.json({
        success: true,
        data: {
          page,
          title: 'Hope Clinic - Mental Health Support',
          description: 'Professional mental health services and therapy',
          keywords: 'mental health, therapy, counseling'
        }
      });
    }

    res.json({
      success: true,
      data: seoMeta
    });
  } catch (error) {
    next(error);
  }
};

export const createSEOMeta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const seoData = req.body;

    const seoMeta = await prisma.sEOMeta.create({
      data: seoData
    });

    res.status(201).json({
      success: true,
      data: seoMeta
    });
  } catch (error) {
    next(error);
  }
};

export const updateSEOMeta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page } = req.params;
    const updateData = req.body;

    const seoMeta = await prisma.sEOMeta.update({
      where: { page },
      data: updateData
    });

    res.json({
      success: true,
      data: seoMeta
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSEOMeta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page } = req.params;

    await prisma.sEOMeta.delete({
      where: { page }
    });

    res.json({
      success: true,
      message: 'SEO meta deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};