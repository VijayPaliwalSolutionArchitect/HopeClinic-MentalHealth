import express from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import * as telemetryController from '../controllers/telemetryController';

const router = express.Router();

// Exception logs
router.get(
  '/exceptions',
  authenticate,
  authorize('ADMIN'),
  telemetryController.getExceptionLogs
);

router.post('/exceptions', telemetryController.logException);

router.patch(
  '/exceptions/:id/resolve',
  authenticate,
  authorize('ADMIN'),
  telemetryController.resolveException
);

// Activity logs
router.get(
  '/activities',
  authenticate,
  authorize('ADMIN'),
  telemetryController.getActivityLogs
);

// Export data
router.get(
  '/export',
  authenticate,
  authorize('ADMIN'),
  telemetryController.exportData
);

export default router;