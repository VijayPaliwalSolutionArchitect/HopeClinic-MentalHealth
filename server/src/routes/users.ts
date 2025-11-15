import express from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import * as userController from '../controllers/userController';

const router = express.Router();

// Admin only routes
router.get('/', authenticate, authorize('ADMIN'), userController.getAllUsers);
router.get('/:id', authenticate, authorize('ADMIN', 'DOCTOR'), userController.getUserById);
router.put('/:id', authenticate, authorize('ADMIN'), userController.updateUser);
router.delete('/:id', authenticate, authorize('ADMIN'), userController.deleteUser);

export default router;