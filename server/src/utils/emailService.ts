import axios from 'axios';

interface EmailParams {
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
  [key: string]: any;
}

export const sendEmailViaEmailJS = async (templateParams: EmailParams) => {
  try {
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS not configured. Email not sent.');
      return { success: false, message: 'Email service not configured' };
    }

    // EmailJS API endpoint
    const response = await axios.post(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: templateParams,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('EmailJS Error:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

export const sendAppointmentConfirmation = async (appointment: any, user: any) => {
  const emailParams = {
    to_email: user.email,
    to_name: `${user.firstName} ${user.lastName}`,
    subject: 'Appointment Confirmation - Hope Clinic',
    message: `Dear ${user.firstName},\n\nYour appointment has been confirmed!\n\nDetails:\n- Type: ${appointment.appointmentType}\n- Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}\n- Time: ${appointment.startTime}\n- Mode: ${appointment.isOnline ? 'Online' : 'In-Person'}\n\nThank you for choosing Hope Clinic.\n\nBest regards,\nHope Clinic Team`,
    appointment_type: appointment.appointmentType,
    appointment_date: new Date(appointment.appointmentDate).toLocaleDateString(),
    appointment_time: appointment.startTime,
    appointment_mode: appointment.isOnline ? 'Online' : 'In-Person',
  };

  return await sendEmailViaEmailJS(emailParams);
};

export const sendInquiryReply = async (inquiry: any, replyMessage: string) => {
  const emailParams = {
    to_email: inquiry.email,
    to_name: inquiry.name,
    subject: `Re: ${inquiry.subject} - Hope Clinic`,
    message: replyMessage,
    original_message: inquiry.message,
  };

  return await sendEmailViaEmailJS(emailParams);
};
