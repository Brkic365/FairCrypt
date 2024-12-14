"use client";
import React, { useState,useEffect } from 'react'
import styles from "../../styles/Dashboard.module.scss";
import SearchBar from '../components/SearchBar';
import data from "../../public/data/emails.json";
import Email from '../components/Email';
import { useSession } from 'next-auth/react';


export default function Page() {
  const [selectedEmail, setSelectedEmail] = useState(data[0]);

  const { data: session, status } = useSession();
  const [emails, setEmails] = useState([]);
  const [scores, setScores] = useState([]);

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
        cache:"force-cache"
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

  const formatDate = (inputDate) => {

    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    
    return `${day}/${month}/${year}`;
  };

  const getHeaderValue = (headers, headerName) => {
    const header = headers.find(h => h.name === headerName);
    return header ? header.value : null;
  };

  const shortenString = (str, val) => {
    if (str.length > val) {
      return str.slice(0, val) + "...";
    }
    return str;
  }

  return (
    <div className={styles.dashboard}>
      <section className={styles.menu}>
        <SearchBar searchResults={emails.length}/>
        <div className={styles.emailList}>
        {emails && emails.map((email) => {
          return <section className={styles.emailPlaceholder} style={{opacity: selectedEmail.id === email.id ? 1 : 0.5}} onClick={() => setSelectedEmail(email)} key={email.id}>
            <section className={styles.top}>
              <h4 className={styles.title}>{shortenString(getHeaderValue(email.payload.headers, "Subject"), 80)}</h4>
              <h2 className={styles.score}>52</h2>
            </section>
            <section className={styles.bottom}>
              <p className={styles.email}>{shortenString(getHeaderValue(email.payload.headers, "From"), 20)}</p>
              <p className={styles.date}>{formatDate(getHeaderValue(email.payload.headers, "Date"))}</p>
            </section>
          </section>
        })}
      </div>
      </section>
      <div className={styles.emailList}>
      <Email email={selectedEmail}/>
      </div>
    </div>
  )
}

