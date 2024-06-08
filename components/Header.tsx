import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/components/Header.module.css";
import Logo from "@/assets/images/logo/logo.svg";

export default function Header() {
  const router = useRouter();
  return (
    <>
      <header className={styles.header}>
        <div className={styles.nav}>
          <Link href="/">
            <Image src={Logo} alt="판다마켓 로고" />
          </Link>

          <Link href="/boards" style={{ textDecoration: "none" }}>
            <span
              className={`${styles.navLink} ${
                router.pathname === "/boards" ? styles.navLinkActive : ""
              }`}
            >
              자유게시판
            </span>
          </Link>
          <Link href="/items" style={{ textDecoration: "none" }}>
            <span
              className={`${styles.navLink} ${
                router.pathname === "/items" ? styles.navLinkActive : ""
              }`}
            >
              중고마켓
            </span>
          </Link>
        </div>

        <Link href="/login">
          <button className={styles.login_button}>로그인</button>
        </Link>
      </header>
    </>
  );
}
