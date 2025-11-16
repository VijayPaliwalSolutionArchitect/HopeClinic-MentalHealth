import express from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middlewares/auth';
import * as appointmentController from '../controllers/appointmentController';

const router = express.Router();

// Get all appointments (admin/doctor/staff)
router.get(
  '/',
  authenticate,
  authorize('ADMIN', 'DOCTOR', 'CLINIC_STAFF'),
  appointmentController.getAllAppointments
);

// Get user's appointments
router.get('/my-appointments', authenticate, appointmentController.getMyAppointments);

// Get available slots
router.get('/available-slots', appointmentController.getAvailableSlots);

// Get appointment by ID
router.get('/:id', authenticate, appointmentController.getAppointmentById);

// Create appointment
router.post(
  '/',
  authenticate,
  [
    body('appointmentDate').isISO8601(),
    body('startTime').notEmpty(),
    body('appointmentType').notEmpty(),
    body('isOnline').isBoolean()
  ],
  appointmentController.createAppointment
);

// Update appointment
router.put(
  '/:id',
  authenticate,
  authorize('ADMIN', 'DOCTOR', 'CLINIC_STAFF'),
  appointmentController.updateAppointment
);

// Cancel appointment
router.patch('/:id/cancel', authenticate, appointmentController.cancelAppointment);

// Mark attended
router.patch(
  '/:id/attend',
  authenticate,
  authorize('ADMIN', 'DOCTOR', 'CLINIC_STAFF'),
  appointmentController.markAttended
);

// Delete appointment
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  appointmentController.deleteAppointment
);

export default router;