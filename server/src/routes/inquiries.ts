import express from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middlewares/auth';
import * as inquiryController from '../controllers/inquiryController';

const router = express.Router();

// Public route
router.post(
  '/',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('subject').notEmpty(),
    body('message').notEmpty()
  ],
  inquiryController.createInquiry
);

// Admin routes
router.get(
  '/',
  authenticate,
  authorize('ADMIN', 'CLINIC_STAFF'),
  inquiryController.getAllInquiries
);

router.get(
  '/:id',
  authenticate,
  authorize('ADMIN', 'CLINIC_STAFF'),
  inquiryController.getInquiryById
);

router.patch(
  '/:id/respond',
  authenticate,
  authorize('ADMIN', 'CLINIC_STAFF'),
  inquiryController.respondToInquiry
);

router.patch(
  '/:id/status',
  authenticate,
  authorize('ADMIN', 'CLINIC_STAFF'),
  inquiryController.updateInquiryStatus
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  inquiryController.deleteInquiry
);

export default router;