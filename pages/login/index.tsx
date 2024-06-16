/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/images/logo/logo.svg';
import Google from '@/public/images/social/google-logo.png';
import Kakao from '@/public/images/social/kakao-logo.png';
import Eyes from '@/public/images/icons/eye-visible.svg';
import NoEyes from '@/public/images/icons/eye-invisible.svg';
import styles from '@/pages/SignPage.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';

interface Login {
  email: string;
  password: string;
}

export default function LogInPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({ mode: 'onBlur' });
  const router = useRouter();
  const [showedPW, SetShowedPW] = useState<boolean>(false);
  const formValues = watch();
  const isFormValid = formValues.email && formValues.password;

  const onSubmit: SubmitHandler<Login> = async ({ email, password }: Login) => {
    await axios
      .post('auth/signIn', {
        email,
        password,
      })
      .then((response) => {
        const accessToken = response.data?.accessToken;
        localStorage.setItem('accessToken', accessToken);
        alert('로그인 성공');
        router.push('/');
      })
      .catch(() => {
        alert('로그인 실패');
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className={styles.sign}>
      <Link href="/">
        <Image className={styles.logo} src={Logo} alt="로그인 페이지 로고" />
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.sign_form}>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">이메일</label>
          <input
            {...register('email', {
              required: { value: true, message: '이메일을 입력해주세요' },
              pattern: {
                value: /^\S+@\S+$/i,
                message: '잘못된 이메일 형식입니다',
              },
            })}
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            className={errors.email ? styles.error_outline : ''}
          />
          {errors?.email?.message && (
            <p className={styles.error}>{errors?.email?.message}</p>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password">비밀번호</label>
          <input
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: { value: 8, message: '8자리 이상 입력해주세요' },
            })}
            type={showedPW ? 'text' : 'password'}
            id="password"
            placeholder="비밀번호를 입력해주세요"
            className={errors.password ? styles.error_outline : ''}
          />
          {showedPW ? (
            <Image
              src={Eyes}
              alt="보이기"
              width={24}
              height={24}
              className={styles.eyes}
              onClick={() => {
                SetShowedPW(!showedPW);
              }}
            />
          ) : (
            <Image
              src={NoEyes}
              alt="보이기"
              width={24}
              height={24}
              className={styles.eyes}
              onClick={() => {
                SetShowedPW(!showedPW);
              }}
            />
          )}
          {errors?.password?.message && (
            <p className={styles.error}>{errors?.password?.message}</p>
          )}
        </div>

        <button type="submit" disabled={!isFormValid}>
          로그인
        </button>
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
        <Link href="/signup">
          <span>회원가입</span>
        </Link>
      </div>
    </div>
  );
}
