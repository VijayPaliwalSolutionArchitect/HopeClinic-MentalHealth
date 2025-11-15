import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../config/prisma';
import { AppError } from '../middlewares/errorHandler';
import { AIService } from '../services/aiService';

const aiService = new AIService();

export const startSession = async (
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
    const { sessionType, consentGiven } = req.body;

    if (!consentGiven) {
      throw new AppError('Consent is required to use AI chat', 400);
    }

    // Create session
    const session = await prisma.aISession.create({
      data: {
        patientId: userId,
        sessionType,
        consentGiven,
        status: 'ACTIVE'
      }
    });

    // Generate initial AI greeting based on session type
    const initialMessage = await aiService.getInitialMessage(sessionType);

    // Store initial AI message
    await prisma.aIMessage.create({
      data: {
        sessionId: session.id,
        role: 'assistant',
        content: initialMessage
      }
    });

    res.status(201).json({
      success: true,
      data: {
        session,
        initialMessage
      }
    });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (
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
    const { sessionId, message } = req.body;

    // Verify session belongs to user
    const session = await prisma.aISession.findUnique({
      where: { id: sessionId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!session) {
      throw new AppError('Session not found', 404);
    }

    if (session.patientId !== userId) {
      throw new AppError('Unauthorized', 403);
    }

    if (session.status !== 'ACTIVE') {
      throw new AppError('Session is not active', 400);
    }

    // Store user message
    await prisma.aIMessage.create({
      data: {
        sessionId,
        role: 'user',
        content: message
      }
    });

    // Get AI response
    const aiResponse = await aiService.getResponse({
      sessionId,
      sessionType: session.sessionType,
      messageHistory: session.messages,
      currentMessage: message
    });

    // Store AI response
    const aiMessage = await prisma.aIMessage.create({
      data: {
        sessionId,
        role: 'assistant',
        content: aiResponse.message,
        sentiment: aiResponse.sentiment,
        emotions: JSON.stringify(aiResponse.emotions),
        keywords: JSON.stringify(aiResponse.keywords)
      }
    });

    // Update session with analysis
    await prisma.aISession.update({
      where: { id: sessionId },
      data: {
        mood: aiResponse.mood,
        urgencyLevel: aiResponse.urgencyLevel,
        redFlags: JSON.stringify(aiResponse.redFlags)
      }
    });

    // Check for crisis/urgent flags
    if (aiResponse.urgencyLevel === 'CRITICAL') {
      await prisma.notification.create({
        data: {
          userId: userId,
          title: 'Urgent: Mental Health Support Needed',
          message: 'Based on your recent chat, we recommend immediate professional support. Please contact our emergency line or visit the nearest emergency center.',
          type: 'error'
        }
      });

      // Log critical exception for admin alert
      await prisma.exceptionLog.create({
        data: {
          source: 'ai-chat',
          level: 'critical',
          message: `Critical mental health flag detected for user ${userId}`,
          payload: JSON.stringify({
            sessionId,
            urgencyLevel: aiResponse.urgencyLevel,
            redFlags: aiResponse.redFlags
          }),
          userId
        }
      });
    }

    res.json({
      success: true,
      data: {
        message: aiMessage,
        analysis: {
          mood: aiResponse.mood,
          urgencyLevel: aiResponse.urgencyLevel,
          sentiment: aiResponse.sentiment
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    const session = await prisma.aISession.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        },
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    if (!session) {
      throw new AppError('Session not found', 404);
    }

    // Check permission
    if (userRole === 'PATIENT' && session.patientId !== userId) {
      throw new AppError('Unauthorized', 403);
    }

    res.json({
      success: true,
      data: session
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSessions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    const where: any = userRole === 'PATIENT' ? { patientId: userId } : {};

    const sessions = await prisma.aISession.findMany({
      where,
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        _count: {
          select: { messages: true }
        }
      },
      orderBy: { startedAt: 'desc' }
    });

    res.json({
      success: true,
      data: sessions
    });
  } catch (error) {
    next(error);
  }
};

export const endSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const session = await prisma.aISession.findUnique({
      where: { id }
    });

    if (!session) {
      throw new AppError('Session not found', 404);
    }

    if (session.patientId !== userId) {
      throw new AppError('Unauthorized', 403);
    }

    const updatedSession = await prisma.aISession.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        endedAt: new Date()
      }
    });

    res.json({
      success: true,
      data: updatedSession
    });
  } catch (error) {
    next(error);
  }
};

export const getReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionId } = req.params;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    const session = await prisma.aISession.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      throw new AppError('Session not found', 404);
    }

    if (userRole === 'PATIENT' && session.patientId !== userId) {
      throw new AppError('Unauthorized', 403);
    }

    const reports = await prisma.aIReport.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: reports
    });
  } catch (error) {
    next(error);
  }
};

export const generateReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionId } = req.params;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    const session = await prisma.aISession.findUnique({
      where: { id: sessionId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!session) {
      throw new AppError('Session not found', 404);
    }

    if (userRole === 'PATIENT' && session.patientId !== userId) {
      throw new AppError('Unauthorized', 403);
    }

    // Generate comprehensive report using AI
    const reportData = await aiService.generateReport(session);

    const report = await prisma.aIReport.create({
      data: {
        sessionId,
        reportType: 'assessment',
        findings: reportData.findings,
        moodAnalysis: reportData.moodAnalysis,
        conditionIndicators: JSON.stringify(reportData.conditionIndicators),
        riskAssessment: reportData.riskAssessment,
        recommendations: reportData.recommendations,
        followUpActions: reportData.followUpActions
      }
    });

    res.status(201).json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};