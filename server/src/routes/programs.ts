import express from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middlewares/auth';
import * as programController from '../controllers/programController';

const router = express.Router();

// Public routes
router.get('/', programController.getAllPrograms);
router.get('/slug/:slug', programController.getProgramBySlug);
router.get('/:id', programController.getProgramById);

// Admin routes
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  [
    body('title').notEmpty(),
    body('slug').notEmpty(),
    body('description').notEmpty()
  ],
  programController.createProgram
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  programController.updateProgram
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  programController.deleteProgram
);

export default router;