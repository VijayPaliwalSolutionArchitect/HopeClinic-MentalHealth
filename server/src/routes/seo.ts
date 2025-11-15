import express from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middlewares/auth';
import * as seoController from '../controllers/seoController';

const router = express.Router();

// Public routes
router.get('/', seoController.getAllSEOMeta);
router.get('/:page', seoController.getSEOMetaByPage);

// Admin routes
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  [
    body('page').notEmpty(),
    body('title').notEmpty(),
    body('description').notEmpty()
  ],
  seoController.createSEOMeta
);

router.put(
  '/:page',
  authenticate,
  authorize('ADMIN'),
  seoController.updateSEOMeta
);

router.delete(
  '/:page',
  authenticate,
  authorize('ADMIN'),
  seoController.deleteSEOMeta
);

export default router;