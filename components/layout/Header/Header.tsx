import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/components/layout/Header/Header.module.css';
import Logo from '@/public/images/logo/logo.svg';

export default function Header() {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <Link href="/">
          <Image src={Logo} alt="판다마켓 로고" />
        </Link>

        <Link href="/boards">
          <span
            className={`${styles.navLink} ${
              router.pathname === '/boards' ? styles.navLinkActive : ''
            }`}
          >
            자유게시판
          </span>
        </Link>
        <Link href="/items">
          <span
            className={`${styles.navLink} ${
              router.pathname === '/items' || router.pathname === '/additem'
                ? styles.navLinkActive
                : ''
            }`}
          >
            중고마켓
          </span>
        </Link>
      </div>

      <Link href="/login">
        <button type="button" className={styles.login_button}>
          로그인
        </button>
      </Link>
    </header>
  );
}
