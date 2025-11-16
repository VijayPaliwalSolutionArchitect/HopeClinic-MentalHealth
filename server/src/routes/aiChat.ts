import express from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middlewares/auth';
import * as aiChatController from '../controllers/aiChatController';

const router = express.Router();

// Start new AI chat session
router.post(
  '/start',
  authenticate,
  [
    body('sessionType').isIn(['INITIAL_ASSESSMENT', 'ONGOING_MONITORING', 'CRISIS_INTERVENTION', 'FOLLOW_UP_CHECK']),
    body('consentGiven').isBoolean()
  ],
  aiChatController.startSession
);

// Send message to AI
router.post(
  '/message',
  authenticate,
  [
    body('sessionId').notEmpty(),
    body('message').notEmpty()
  ],
  aiChatController.sendMessage
);

// Get session by ID
router.get('/session/:id', authenticate, aiChatController.getSession);

// Get all user sessions
router.get('/sessions', authenticate, aiChatController.getUserSessions);

// End session
router.patch('/session/:id/end', authenticate, aiChatController.endSession);

// Get AI report
router.get('/report/:sessionId', authenticate, aiChatController.getReport);

// Generate report
router.post('/report/:sessionId/generate', authenticate, aiChatController.generateReport);

export default router;