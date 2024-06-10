import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/components/Header.module.css";
import Logo from "@/assets/images/logo/logo.svg";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.nav}>
          <Link href="/">
            <Image src={Logo} alt="판다마켓 로고" />
          </Link>

          <Link href="/boards">
            <div>자유게시판</div>
          </Link>
          <Link href="/items">
            <div>중고마켓</div>
          </Link>
        </div>

        <Link href="/login">
          <button className={styles.login_button}>로그인</button>
        </Link>
      </header>
    </>
  );
}
