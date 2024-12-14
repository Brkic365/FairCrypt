// components/Emails.js
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Emails() {
  const { data: session, status } = useSession();
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    if (session && session.accessToken) {
      // Fetch emails from your API
      fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: session.accessToken,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.emails) {
            setEmails(data.emails);
            console.log(data.emails);
          }
        })
        .catch((error) => {
          console.error('Error fetching emails:', error);
        });
    }
  }, [session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to view your emails.</div>;
  }

  return (
    <div>
      <h1>Your Emails</h1>
      {emails.length === 0 ? (
        <p>No emails found.</p>
      ) : (
        <ul>
          {emails.map((email) => (
            <li key={email.id}>
              <strong>Subject:</strong> {email.snippet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
