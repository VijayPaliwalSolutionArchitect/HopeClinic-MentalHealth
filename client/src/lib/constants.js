export const APP_NAME = 'Hope Clinic';
export const APP_DESCRIPTION = 'Professional Mental Health Services';

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  CLINIC_STAFF: 'CLINIC_STAFF',
  PATIENT: 'PATIENT',
};

export const APPOINTMENT_STATUS = {
  SCHEDULED: 'SCHEDULED',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW',
  RESCHEDULED: 'RESCHEDULED',
};

export const APPOINTMENT_TYPES = {
  INITIAL_CONSULTATION: 'INITIAL_CONSULTATION',
  FOLLOW_UP: 'FOLLOW_UP',
  THERAPY_SESSION: 'THERAPY_SESSION',
  ASSESSMENT: 'ASSESSMENT',
  EMERGENCY: 'EMERGENCY',
};

export const SESSION_TYPES = {
  INITIAL_ASSESSMENT: 'INITIAL_ASSESSMENT',
  ONGOING_MONITORING: 'ONGOING_MONITORING',
  CRISIS_INTERVENTION: 'CRISIS_INTERVENTION',
  FOLLOW_UP_CHECK: 'FOLLOW_UP_CHECK',
};

export const MEETING_PLATFORMS = [
  { value: 'google-meet', label: 'Google Meet' },
  { value: 'zoom', label: 'Zoom' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'skype', label: 'Skype' },
  { value: 'teams', label: 'Microsoft Teams' },
];