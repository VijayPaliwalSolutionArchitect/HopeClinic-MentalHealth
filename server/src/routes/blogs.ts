import express from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middlewares/auth';
import * as blogController from '../controllers/blogController';

const router = express.Router();

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/slug/:slug', blogController.getBlogBySlug);
router.get('/categories', blogController.getCategories);
router.get('/tags', blogController.getTags);

// Protected routes
router.get('/:id', blogController.getBlogById);

router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'DOCTOR'),
  [
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('slug').notEmpty()
  ],
  blogController.createBlog
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN', 'DOCTOR'),
  blogController.updateBlog
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  blogController.deleteBlog
);

router.patch('/:id/publish', authenticate, authorize('ADMIN'), blogController.publishBlog);
router.patch('/:id/increment-views', blogController.incrementViews);

export default router;