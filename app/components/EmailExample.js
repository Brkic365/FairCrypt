import styles from "../../styles/EmailExample.module.scss";

import { HiOutlineShieldExclamation } from "react-icons/hi2";
import { AiOutlineLike } from "react-icons/ai";

export default function EmailExample() {
  return (
    <section className={styles.emailExample}>
        <section className={styles.content}>
          <section className={styles.top}>
            <section className={styles.popup}>
              <div className={styles.report}>
                <HiOutlineShieldExclamation />
                <p>Report</p>
              </div>
              <div className={styles.approve}>
                <AiOutlineLike />
                <p>Approve</p>
              </div>
            </section>
            <h3><div className={styles.cursor}><svg width="18" height="47" viewBox="0 0 18 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="9" y1="14" x2="9" y2="47" stroke="#5577D5" strokeWidth="2"/>
            <path d="M9 16L16.7942 4H1.20577L9 16Z" fill="#5577D5"/>
            </svg>
            </div>You just won a brand new iPhone 16!</h3>
            <div className={styles.rating}>
              <p>98% Fraud</p>
            </div>
          </section>
          <p>
            You are our Grand Prize Winner! We are thrilled to inform you that you've been selected to receive a brand-new iPhone 16 as part of our exclusive Holiday Giveaway.
            This is your chance to own the latest, most coveted iPhone model—before it even hits stores!
            To claim your prize, simply follow these easy steps:
            <br />1. Click on the link below to confirm your details and finalize your prize registration: [Claim My iPhone 16 Now!]
            <br />2. Enter your shipping address and payment information for the small processing fee of $9.99 (for expedited shipping).
            <br />3. Once your details are confirmed, your iPhone 16 will be shipped immediately—and {"you’ll"} be the first to experience it!
          </p>
          <section className={styles.rate}>
            <HiOutlineShieldExclamation />
            <AiOutlineLike />
          </section>
        </section>
    </section>
  );
}
