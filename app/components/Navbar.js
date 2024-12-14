"use client";

import styles from "../../styles/Navbar.module.scss";

import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <section className={styles.left}>
      <section className={styles.logo}>
        <img src="/images/logo.png" />
      </section>
      <ul>
        <li><Link href="/#features">Features</Link></li>
        <li><Link href="/pricing">Pricing</Link></li>
        <li>Contact</li>
      </ul>
      </section>
      <section className={styles.buttons}>
        <button>Join</button>
        <button className={styles.signin} onClick={() => {signIn("google")}}>Sign In</button>
      </section>
    </nav>
  );
}
