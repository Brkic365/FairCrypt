"use client";

import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Navbar from "./components/Navbar";
import EmailExample from "./components/EmailExample";

import { HiArrowSmRight } from "react-icons/hi";
import { useEffect } from "react";

export default function Home() {

  const handleCheckSpam = async () => {
    const response = await fetch('/api/spam-detection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: "We wanted to let you know that there’s an important update to your account. Please log in to your account to review the changes made to your settings and ensure everything is up-to-date.If you have any questions or need help, feel free to contact our support team at [support@example.com].Best regards,The [Company Name] Team" }),
    });

    const data = await response.json();
    console.log("Fraud: ", data.result[0][0].score);
    console.log("Legit: ", data.result[0][1].score);
  };

  useEffect(() => {
    handleCheckSpam();
  }, [])

  return (
    <main className={styles.page}>
      <section className={styles.promo}>
        <p>Christmas sale just started! Use code SENTRYMASS for 30% at checkout!</p>
      </section>
      <section className={styles.hero}>
        <Navbar />
        <h1>Shield Your Digital World With Next-Gen AI</h1>
        <p>Revolutionize your security with real-time fraud and spam detection across emails, messages, and calls. Stay safe, stay ahead.</p>
        <section className={styles.ctas}>
          <button className={styles.fancyBtn}>Start For Free<HiArrowSmRight /></button>
          <button>Check Pricing<HiArrowSmRight /></button>
        </section>
        <EmailExample />
      </section>

      <img src="/images/world.png" alt="world" className={styles.worldImg} />
 
      <section className={styles.companies}>
        <span>Fueled by the Expertise of Top Tech Companies</span>
        <section className={styles.images}>
          <img src="/images/infobip.png" alt="infobip" />
          <img src="/images/openai.png" alt="openai" />
          <img src="/images/google.png" alt="google" />
        </section>
      </section>

      <section className={styles.features} id="features">
        <h2>AI Powered Fraud Detection</h2>
        <p>Save your precious time and let us check your emails for fraud using newest AI technologies.</p>
        <section className={styles.email}>
          <div className={styles.left}>
            <div className={styles.text}>
            <h3>Email API Integration</h3>
            <p>By using official Gmail API, we do all the work for you! Our software automatically pulls any new emails and detects them for fraud. All you have to do is double check if AI made the right decision.</p>
            </div>
            <button className={styles.fancyBtn}>Learn More</button>
          </div>
          <div className={styles.right}>
            <div className={styles.scan} />
            <p>You are our <span>Grand Prize Winner!</span> We are thrilled to inform you that <span>you've been selected</span>   to receive a brand-new iPhone 16 as part of our <span>exclusive Holiday Giveaway.</span><br /><br />
            <span>This is your chance</span> to own the latest, most coveted iPhone model—before it even hits stores!</p>
          </div>
        </section>
        <div className={styles.bottomFeatures}>
          <section className={styles.bottomFeature}>
            <div className={styles.text}>
              <h3>Report System</h3>
              <p>Our AI model continuously evolves and improves as it learns from user interactions. By reporting fraudulent emails, you contribute to making the system smarter and more effective. The more users we have, the more powerful and accurate our detection becomes.</p>
            </div>
          </section>
          <section className={styles.bottomFeature}>
            <div className={styles.text}>
              <h3>SMS/Audio Detection</h3>
              <p>We are actively working on integrating SMS and audio fraud detection to expand our capabilities. Additionally, we’re always looking for beta testers to help us refine and enhance our system. If you're interested, feel free to reach out to us!</p>
            </div>
          </section>
        </div>
      </section>
      <span className={styles.footer}>© FraudSentry 2024</span>
    </main>
  );
}
