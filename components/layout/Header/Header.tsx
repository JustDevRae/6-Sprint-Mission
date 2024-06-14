/* eslint-disable no-alert */
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/components/layout/Header/Header.module.css';
import Logo from '@/public/images/logo/logo.svg';
import Profile from '@/public/images/icons/ic_profile.svg';
import React, { useEffect, useState } from 'react';

export default function Header() {
  const [hasAccessToken, setHasAccessToken] = useState<boolean>(false);
  const router = useRouter();

  const checkAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    setHasAccessToken(!!accessToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    checkAccessToken();
    alert('로그아웃 성공');
    router.push('/');
  };

  useEffect(() => {
    checkAccessToken();
  }, []);

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

      {hasAccessToken ? (
        <button
          type="button"
          style={{ backgroundColor: '#fff' }}
          onClick={handleLogout}
        >
          <Image src={Profile} alt="프로필아이콘" width={40} height={40} />
        </button>
      ) : (
        <Link href="/login">
          <button type="button" className={styles.login_button}>
            로그인
          </button>
        </Link>
      )}
    </header>
  );
}
