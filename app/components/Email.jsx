import styles from "../../styles/Email.module.scss";
import { useState, useEffect } from "react";

export default function Email({key, email}) {

  const [fraudScore, setFraudScore] = useState(0);

  function base64UrlDecode(base64Url) {
    // Convert URL-safe Base64 to standard Base64 by replacing `-` and `_` with `+` and `/`
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Add padding (`=`) if it's missing
    const padding = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
    base64 += padding;
  
    // Decode the Base64 string
    return decodeURIComponent(escape(atob(base64)));
  }
  
  function getPlainTextEmailBody() {
    const parts = email.payload.parts;
    let emailBody = '';
  
    console.log("Email Payload: ", email.payload);
  
    try {
      if (parts) {
        // Loop through all parts and extract only text/plain part
        for (const part of parts) {
          // Only look for text/plain MIME type
          if (part.mimeType === 'text/plain') {
            console.log("Found plain text part.");
  
            // Decode the Base64 string from the body.data
            emailBody = base64UrlDecode(part.body.data);
            
            break;  // We exit after decoding the first text/plain part
          }
        }
      } else {
        // If there are no parts, the body might be inline (non-multipart)
        if (email.payload.body.data) {
          emailBody = base64UrlDecode(email.payload.body.data);
        }
      }
    } catch (error) {
      console.error("Error decoding email body: ", error);
    }
    
    return emailBody;
  }

  const handleCheckSpam = async () => {
    const response = await fetch('/api/spam-detection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: getPlainTextEmailBody() }),
    });

    const data = await response.json();

    if(data.result) {
      setFraudScore(data.result[0][0].score * 100);
      console.log(data.result[0][0].score * 100);
    } else {
      //setFraudScore(Math.random() * 100);
    }
    console.log(data);
  };

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

  useEffect(() => {
    handleCheckSpam();
  }, [email])

  return(<>

    <section id={styles.main_frame}>
    <section id={styles.message_preview_frame}>
      <section id={styles.header}>
        <h2 id={styles.title}>{getHeaderValue(email.payload.headers, "Subject")}</h2>
        <div id={styles.fraud_meter}>{Math.round(fraudScore)}% Risk</div>
      </section>

      <section id={styles.contact_info}>
        <div id={styles.mail_deliverer}>{getHeaderValue(email.payload.headers, "From")}</div>
        <div id={styles.mail_delivered_date}>{formatDate(getHeaderValue(email.payload.headers, "Date"))}</div>
      </section>

      <ul id={styles.controls}>
        <li>Overview
          <div className="controls-underline"></div>
        </li>
        <li>Summary
          <div className="controls-underline"></div>
        </li>
        <li>Analytics
          <div className="controls-underline"></div>
        </li>
        <li>Feedback
          <div className="controls-underline"></div>
        </li>
      </ul>

      <section id={styles.content}>
        <h3 id={styles.controls_heading}>Overview</h3>
        <p id={styles.content_message}>
        {getPlainTextEmailBody()}
        </p>
      </section>

      <h3 id={styles.attachments_heading}>Attachments</h3>
      <ul id={styles.attachments}>
          <li>
            <button>
              <img src="/images/file_icon.png" alt="file_icon" />
              program.exe</button>
          </li>
          <li>
            <button>
            <img src="/images/file_icon.png" alt="file_icon" />
            program.exe</button>
          </li>
          <li>
            <button>
              <img src="/images/file_icon.png" alt="file_icon" />
            program.exe</button>
          </li>
        </ul>

      <ul id={styles.actions}>
          <li>
            <button>Reply</button>
          </li>
          <li>
            <button className={styles.forward}>Forward</button>
          </li>
          <li>
            <button className={styles.report}>Report</button>
          </li>
      </ul>

      <section id={styles.review}>
        <h4 id={styles.review_heading}>Review</h4>
        <div id={styles.risk_meter}>
          <h4>You're at risk!</h4>
          <p>Do not respond or engage with 
          this email by any means</p>
        </div>
      </section>

      <section id={styles.risk_notes}>
        Nothing found
      </section>


    </section>

    </section>

  </>);
}