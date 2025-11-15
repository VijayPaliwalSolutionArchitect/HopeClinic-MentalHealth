import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET || 'secret';
  const expiresIn: string = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(payload, secret, { expiresIn });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_REFRESH_SECRET || 'refresh-secret';
  const expiresIn: string = process.env.JWT_REFRESH_EXPIRES_IN || '30d';
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET || 'refresh-secret'
  ) as TokenPayload;
};

export const createRefreshToken = async (userId: string, token: string) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  return await prisma.refreshToken.create({
    data: {
      userId,
      token,
      expiresAt
    }
  });
};

export const deleteRefreshToken = async (token: string) => {
  await prisma.refreshToken.deleteMany({
    where: { token }
  });
};