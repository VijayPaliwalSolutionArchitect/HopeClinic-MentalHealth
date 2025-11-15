import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { AppError } from '../middlewares/errorHandler';

export const getSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.query;

    const where: any = {};

    if (category) {
      where.category = category;
    }

    const settings = await prisma.setting.findMany({
      where
    });

    // Convert to key-value object
    const settingsObject = settings.reduce((acc: any, setting) => {
      let value = setting.value;
      
      // Parse value based on type
      if (setting.type === 'number') {
        value = Number(value);
      } else if (setting.type === 'boolean') {
        value = value === 'true';
      } else if (setting.type === 'json') {
        try {
          value = JSON.parse(value);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }
      
      acc[setting.key] = value;
      return acc;
    }, {});

    res.json({
      success: true,
      data: settingsObject
    });
  } catch (error) {
    next(error);
  }
};

export const getSettingByKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { key } = req.params;

    const setting = await prisma.setting.findUnique({
      where: { key }
    });

    if (!setting) {
      throw new AppError('Setting not found', 404);
    }

    let value = setting.value;
    
    if (setting.type === 'number') {
      value = Number(value);
    } else if (setting.type === 'boolean') {
      value = value === 'true';
    } else if (setting.type === 'json') {
      try {
        value = JSON.parse(value);
      } catch (e) {}
    }

    res.json({
      success: true,
      data: { [key]: value }
    });
  } catch (error) {
    next(error);
  }
};

export const createSetting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { key, value, type, category } = req.body;

    const setting = await prisma.setting.create({
      data: {
        key,
        value: String(value),
        type: type || 'string',
        category: category || 'general'
      }
    });

    res.status(201).json({
      success: true,
      data: setting
    });
  } catch (error) {
    next(error);
  }
};

export const updateSetting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    const setting = await prisma.setting.update({
      where: { key },
      data: { value: String(value) }
    });

    res.json({
      success: true,
      data: setting
    });
  } catch (error) {
    next(error);
  }
};