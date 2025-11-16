import express from 'express';
import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { getGoogleOAuthURL, getGoogleUser } from '../utils/googleOAuth';
import {
  generateAccessToken,
  generateRefreshToken,
  createRefreshToken,
} from '../utils/jwt';

const router = express.Router();

// @route   GET /api/auth/google
// @desc    Get Google OAuth URL
// @access  Public
router.get('/google', (req: Request, res: Response) => {
  const url = getGoogleOAuthURL();
  res.json({ success: true, data: { url } });
});

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) {
    return res.redirect(`${process.env.CLIENT_URL}/login?error=missing_code`);
  }

  try {
    // Get user from Google
    const googleUser = await getGoogleUser(code);

    if (!googleUser.verified_email) {
      return res.redirect(
        `${process.env.CLIENT_URL}/login?error=email_not_verified`
      );
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    // Create user if doesn't exist
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          password: '', // No password for OAuth users
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          avatar: googleUser.picture,
          role: 'PATIENT',
          isVerified: true,
          isActive: true,
        },
      });

      // Create patient profile
      await prisma.patientProfile.create({
        data: {
          userId: user.id,
        },
      });
    } else {
      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    await createRefreshToken(user.id, refreshToken);

    // Redirect to frontend with tokens
    const redirectUrl = `${process.env.CLIENT_URL}/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}&user=${encodeURIComponent(JSON.stringify({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role }))}`;
    
    res.redirect(redirectUrl);
  } catch (error: any) {
    console.error('Google OAuth error:', error);
    res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);
  }
});

export default router;
