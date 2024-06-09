import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo/logo.svg";
import Google from "@/public/images/social/google-logo.png";
import Kakao from "@/public/images/social/kakao-logo.png";
import styles from "@/styles/SignPage.module.css";
import React, { useEffect, useState } from "react";

export default function SignUpPage() {
  return (
    <div className={styles.sign}>
      <Link href="/">
        <Image className={styles.logo} src={Logo} alt="회원가입 페이지 로고" />
      </Link>

      <form className={styles.sign_form}>
        <label>이메일</label>
        <input type="email" placeholder="이메일을 입력해주세요" />

        <label>닉네임</label>
        <input type="text" placeholder="닉네임을 입력해주세요" />

        <label>비밀번호</label>
        <input type="text" placeholder="비밀번호를 입력해주세요" />

        <label>비밀번호 확인</label>
        <input type="text" placeholder="비밀번호를 다시 한 번 입력해주세요" />

        <button>회원가입</button>
      </form>

      <div className={styles.easy_login}>
        <p>간편 로그인하기</p>
        <div className={styles.login_icons}>
          <Image src={Google} alt="구글 로그인" />
          <Image src={Kakao} alt="카카오톡 로그인" />
        </div>
      </div>

      <div className={styles.go_signup}>
        판다마켓이 처음이신가요?
        <Link href="/login">
          <span>로그인</span>
        </Link>
      </div>
    </div>
  );
}
