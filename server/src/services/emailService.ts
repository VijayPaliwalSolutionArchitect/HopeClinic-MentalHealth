// EmailJS integration for sending emails
import { sendAppointmentConfirmation, sendInquiryReply } from '../utils/emailService';

export const sendAppointmentEmail = async (appointment: any) => {
  try {
    const user = appointment.patient;
    const result = await sendAppointmentConfirmation(appointment, user);
    
    if (result.success) {
      console.log('✅ Appointment confirmation email sent to:', user.email);
    } else {
      console.warn('⚠️ Email sending failed (EmailJS not configured)');
    }
    
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

export const sendWelcomeEmail = async (user: any) => {
  try {
    console.log('Sending welcome email:', {
      to: user.email,
      subject: 'Welcome to Hope Clinic',
      name: `${user.firstName} ${user.lastName}`
    });
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

export const sendInquiryResponse = async (inquiry: any, response: string) => {
  try {
    console.log('Sending inquiry response:', {
      to: inquiry.email,
      subject: `Re: ${inquiry.subject}`,
      response
    });
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};