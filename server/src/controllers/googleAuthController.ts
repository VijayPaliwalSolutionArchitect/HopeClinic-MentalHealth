import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import prisma from '../config/prisma';
import { generateAccessToken, generateRefreshToken, createRefreshToken } from '../utils/jwt';
import { AppError } from '../middlewares/errorHandler';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;

    if (!token) {
      throw new AppError('Google token is required', 400);
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new AppError('Invalid Google token', 401);
    }

    const { email, given_name, family_name, picture } = payload;

    if (!email) {
      throw new AppError('Email not found in Google account', 400);
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        avatar: true,
        isActive: true,
        isVerified: true,
      },
    });

    // Create user if doesn't exist
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          password: '', // No password for OAuth users
          firstName: given_name || 'User',
          lastName: family_name || '',
          avatar: picture,
          role: 'PATIENT',
          isVerified: true,
          isActive: true,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          phone: true,
          avatar: true,
          isActive: true,
          isVerified: true,
        },
      });
    } else {
      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
    }

    if (!user.isActive) {
      throw new AppError('Your account has been deactivated', 403);
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token
    await createRefreshToken(user.id, refreshToken);

    res.json({
      success: true,
      data: {
        user,
        accessToken,
        refreshToken,
      },
      message: 'Google authentication successful',
    });
  } catch (error: any) {
    next(error);
  }
};
