// app/api/emails/route.js
import { google } from 'googleapis';

async function getEmails(accessToken) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  try {
    const res = await gmail.users.messages.list({ userId: 'me' });
    const messages = res.data.messages || [];

    // Fetch full message details for each message
    const emails = await Promise.all(
      messages.map(async (message) => {
        try {
          const msg = await gmail.users.messages.get({ userId: 'me', id: message.id });
          return msg.data;
        } catch (error) {
          console.error('Error fetching message details for id:', message.id, error);
          return null;
        }
      })
    );

    return emails.filter(email => email !== null); // Filter out null results
  } catch (error) {
    console.error('Error fetching messages from Gmail:', error);
    throw error; // Propagate the error
  }
}

// Named export for POST method
export async function POST(req) {
  try {
    // Parse the request body
    const { accessToken } = await req.json();

    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'Access token is required' }), { status: 400 });
    }

    // Get emails from Gmail using the access token
    const emails = await getEmails(accessToken);

    if (emails.length === 0) {
      return new Response(JSON.stringify({ error: 'No emails found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ emails: emails }), { status: 200 });
    
    } catch (error) {
    console.error('Error fetching emails:', error);
    return new Response(JSON.stringify({ error: 'Error fetching emails' }), { status: 500 });
  }
}
