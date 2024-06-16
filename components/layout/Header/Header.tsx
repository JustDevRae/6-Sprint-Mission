/* eslint-disable no-alert */
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Logo from '@/public/images/logo/logo.svg';
import Profile from '@/public/images/icons/ic_profile.svg';

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
    <header className="sticky left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b-[1px] border-solid border-b-gray-400 bg-white px-[200px]">
      <div className="flex items-center gap-[46px]">
        <Link href="/">
          <Image src={Logo} alt="판다마켓 로고" />
        </Link>

        <Link href="/boards">
          <span
            className={`${'text-lg font-bold text-gray-600'} ${
              router.pathname === '/boards' ? 'text-blue-active' : ''
            }`}
          >
            자유게시판
          </span>
        </Link>
        <Link href="/items">
          <span
            className={`${'text-lg font-bold text-gray-600'} ${
              router.pathname === '/items' || router.pathname === '/additem'
                ? 'text-blue-active'
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
          <button
            type="button"
            className="h-[48px] w-[128px] rounded-lg bg-blue-active text-base font-semibold text-white hover:bg-blue-hover"
          >
            로그인
          </button>
        </Link>
      )}
    </header>
  );
}
