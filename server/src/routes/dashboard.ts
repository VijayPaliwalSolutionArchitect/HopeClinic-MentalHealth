import express from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import * as dashboardController from '../controllers/dashboardController';

const router = express.Router();

// Admin dashboard stats
router.get(
  '/stats',
  authenticate,
  authorize('ADMIN', 'DOCTOR'),
  dashboardController.getDashboardStats
);

// Patient dashboard
router.get(
  '/patient',
  authenticate,
  dashboardController.getPatientDashboard
);

// Doctor dashboard
router.get(
  '/doctor',
  authenticate,
  authorize('DOCTOR'),
  dashboardController.getDoctorDashboard
);

export default router;