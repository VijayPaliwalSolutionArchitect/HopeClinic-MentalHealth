import express from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middlewares/auth';
import * as testimonialController from '../controllers/testimonialController';

const router = express.Router();

// Public routes
router.get('/', testimonialController.getAllTestimonials);

// Protected routes
router.post(
  '/',
  authenticate,
  [
    body('message').notEmpty(),
    body('rating').isInt({ min: 1, max: 5 })
  ],
  testimonialController.createTestimonial
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  testimonialController.updateTestimonial
);

router.patch(
  '/:id/approve',
  authenticate,
  authorize('ADMIN'),
  testimonialController.approveTestimonial
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  testimonialController.deleteTestimonial
);

export default router;