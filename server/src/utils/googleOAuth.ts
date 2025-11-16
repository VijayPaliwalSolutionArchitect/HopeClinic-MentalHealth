import axios from 'axios';

export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export const getGoogleOAuthURL = (): string => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  
  const options = {
    redirect_uri: process.env.GOOGLE_CALLBACK_URL as string,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};

export const getGoogleUser = async (code: string): Promise<GoogleUserInfo> => {
  const url = 'https://oauth2.googleapis.com/token';

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL as string,
    grant_type: 'authorization_code',
  };

  try {
    const res = await axios.post(url, new URLSearchParams(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { id_token, access_token } = res.data;

    // Fetch user info
    const userInfoResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    return userInfoResponse.data;
  } catch (error: any) {
    console.error('Error getting Google user:', error.response?.data || error.message);
    throw new Error('Failed to get Google user');
  }
};
