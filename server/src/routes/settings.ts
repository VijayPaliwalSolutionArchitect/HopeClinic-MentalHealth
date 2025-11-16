import express from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import * as settingController from '../controllers/settingController';

const router = express.Router();

// Get all settings or by category
router.get('/', settingController.getSettings);

// Get setting by key
router.get('/:key', settingController.getSettingByKey);

// Update setting
router.put(
  '/:key',
  authenticate,
  authorize('ADMIN'),
  settingController.updateSetting
);

// Create setting
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  settingController.createSetting
);

export default router;