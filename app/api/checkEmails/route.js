import { google } from 'googleapis';

async function getEmails(accessToken) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  
  try {
    const res = await gmail.users.messages.list({ userId: 'me' });
    console.log('Gmail messages list response:', res);

    const messages = res.data.messages || [];
    console.log('Messages:', messages);

    // Fetch full message details
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
    
  }
}

async function analyzeEmailContent(content) {
  const language = google.language('v1');
  const [result] = await language.documents.analyzeSentiment({ document: { content, type: 'PLAIN_TEXT' } });
  return result;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { accessToken } = req.body;

    try {
      // Get emails from Gmail
      const emails = await getEmails(accessToken);

      if (emails.length === 0) {
        res.status(404).json({ error: 'No emails found' });
        return;
      }

      // Analyze each email for potential fraud/spam
      const processedEmails = await Promise.all(
        emails.map(async (email) => {
          const fraudScore = await analyzeEmailContent(email.snippet); // Analyze email content
          return { ...email, fraudScore };
        })
      );

      res.status(200).json(processedEmails);
    } catch (error) {
      console.error('Error processing emails:', error);
      res.status(500).json({ error: 'Error processing emails' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}