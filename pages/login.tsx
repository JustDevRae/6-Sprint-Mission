import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/logo/logo.svg";
import Google from "@/assets/images/social/google-logo.png";
import Kakao from "@/assets/images/social/kakao-logo.png";
import styles from "@/styles/SignPage.module.css";
import React, { useEffect, useState } from "react";

interface Login {
  email: string;
  password: string;
}

export default function LogInPage() {
  const [isDisaled, setIsDisabled] = useState(true);
  const [errorMessages, setErrorMessages] = useState<Login>({
    email: "",
    password: "",
  });
  const [inputValues, setLoginInput] = useState<Login>({
    email: "",
    password: "",
  });

  // input태그에 값을 입력시 호출할 핸들러
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { email, password } = inputValues;
    setLoginInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (e.target.name === "email") {
      if (email.includes("@")) {
        setErrorMessages((prevError) => ({
          ...prevError,
          [e.target.name]: "",
        }));
      }
    }

    if (e.target.name === "password") {
      if (password.length >= 7) {
        setErrorMessages((prevError) => ({
          ...prevError,
          [e.target.name]: "",
        }));
      }
    }
  };

  // focusout이 발생한 이벤트 객체의 name이 email일 때 호출할 핸들러
  const handleEmailValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email_pattern = "";

    if (inputValues.email.trim() === "") {
      setErrorMessages((prevError) => ({
        ...prevError,
        [e.target.name]: "이메일을 입력해주세요",
      }));
    } else if (!inputValues.email.includes("@")) {
      setErrorMessages((prevError) => ({
        ...prevError,
        [e.target.name]: "잘못된 이메일 형식입니다",
      }));
    } else {
      setErrorMessages((prevError) => ({
        ...prevError,
        [e.target.name]: "",
      }));
    }
  };

  // focusout이 발생한 이벤트 객체의 name이 password일 때 호출할 핸들러
  const handlePWlValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password_pattern = "";

    if (inputValues.password.trim() === "") {
      setErrorMessages((prevError) => ({
        ...prevError,
        [e.target.name]: "비밀번호를 입력해주세요",
      }));
    } else if (inputValues.password.length < 8) {
      setErrorMessages((prevError) => ({
        ...prevError,
        [e.target.name]: "비밀번호를 8자 이상 입력해주세요",
      }));
    } else {
      setErrorMessages((prevError) => ({
        ...prevError,
        [e.target.name]: "",
      }));
    }
  };

  // input 태그 focusout 시 호출할 핸들러
  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      handleEmailValidation(e);
    }
    if (e.target.name === "password") {
      handlePWlValidation(e);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const { email, password } = inputValues;
    console.log("inputValue감지");

    if (email.includes("@") && password.length >= 8) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [inputValues]);

  return (
    <div className={styles.sign}>
      <Link href="/">
        <Image className={styles.logo} src={Logo} alt="로그인 페이지 로고" />
      </Link>

      <form onSubmit={handleSubmit} className={styles.sign_form}>
        <label>이메일</label>
        <input
          type="email"
          name="email"
          value={inputValues.email}
          placeholder="이메일을 입력해주세요"
          onChange={handleInput}
          onBlur={handleOnBlur}
          style={{
            outline:
              errorMessages.email !== ""
                ? "1px solid #F74747"
                : "1px solid #3182f6",
          }}
        />
        {errorMessages.email && <p className={styles.error}>{errorMessages.email}</p>}

        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          value={inputValues.password}
          placeholder="비밀번호를 입력해주세요"
          onChange={handleInput}
          onBlur={handleOnBlur}
          style={{
            outline: errorMessages.password
              ? "1px solid #F74747"
              : "1px solid #3182f6",
          }}
        />
        {errorMessages.password && (
          <p className={styles.error}>{errorMessages.password}</p>
        )}

        <button disabled={isDisaled}>로그인</button>
      </form>

      <div className={styles.easy_login}>
        <p>간편 로그인하기</p>
        <div className={styles.login_icons}>
          <Image src={Google} alt="구글 로그인" />
          <Image src={Kakao} alt="카카오톡 로그인" />
        </div>
      </div>

      <div className={styles.go_signup}>
        판다마켓이 처음이신가요?{" "}
        <Link href="/signup">
          <span>회원가입</span>
        </Link>
      </div>
    </div>
  );
}
