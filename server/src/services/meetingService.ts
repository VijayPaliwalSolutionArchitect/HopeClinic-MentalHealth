// Meeting link generation service
// Supports multiple platforms: Google Meet, Zoom, WhatsApp, Skype, MS Teams

import { v4 as uuidv4 } from 'uuid';

interface MeetingDetails {
  title: string;
  date: string;
  time: string;
}

export const generateMeetingLink = async (
  platform: string,
  details: MeetingDetails
): Promise<string> => {
  const meetingId = uuidv4();

  switch (platform.toLowerCase()) {
    case 'google-meet':
      // In production, integrate with Google Calendar API
      return `https://meet.google.com/${meetingId.substring(0, 10)}`;

    case 'zoom':
      // In production, integrate with Zoom API
      return `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`;

    case 'whatsapp':
      // WhatsApp doesn't have meeting links, return clinic WhatsApp number
      return 'https://wa.me/1234567890'; // Replace with actual clinic number

    case 'skype':
      // Skype meet now link
      return `https://join.skype.com/meet/${meetingId.substring(0, 12)}`;

    case 'teams':
      // In production, integrate with MS Teams API
      return `https://teams.microsoft.com/l/meetup-join/${meetingId}`;

    default:
      return `https://meet.google.com/${meetingId.substring(0, 10)}`;
  }
};