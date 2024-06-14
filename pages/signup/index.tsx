/* eslint-disable no-alert */
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

interface Signup {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignUpPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>({ mode: 'onBlur' });
  const [showedPW, SetShowedPW] = useState<boolean>(false);
  const [showedPWCheck, SetShowedPWCheck] = useState<boolean>(false);
  const router = useRouter();
  const formValues = watch();
  const isFormValid =
    formValues.email &&
    formValues.nickname &&
    formValues.password &&
    formValues.passwordConfirmation;

  const onSubmit: SubmitHandler<Signup> = async ({
    email,
    nickname,
    password,
    passwordConfirmation,
  }: Signup) => {
    await axios
      .post('auth/signUp', {
        email,
        nickname,
        password,
        passwordConfirmation,
      })
      .then(() => {
        alert('회원가입성공');
        router.replace('/login');
      })
      .catch(() => {
        alert('회원가입실패');
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
        <Image className={styles.logo} src={Logo} alt="회원가입 페이지 로고" />
      </Link>

      <form className={styles.sign_form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">이메일</label>

          <input
            /* eslint-disable react/jsx-props-no-spreading */
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
          <label htmlFor="nickname">닉네임</label>
          <input
            {...register('nickname', {
              required: '닉네임을 입력해주세요',
            })}
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            className={errors.nickname ? styles.error_outline : ''}
          />
          {errors?.nickname?.message && (
            <p className={styles.error}>{errors?.nickname?.message}</p>
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

        <div className={styles.inputWrapper}>
          <label htmlFor="checkpassword">비밀번호 확인</label>
          <input
            {...register('passwordConfirmation', {
              required: '비밀번호를 다시 한 번 입력해주세요',
              validate: (value) => value === formValues.passwordConfirmation,
            })}
            type={showedPWCheck ? 'text' : 'password'}
            id="checkpassword"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            className={errors.passwordConfirmation ? styles.error_outline : ''}
          />
          {showedPWCheck ? (
            <Image
              src={Eyes}
              alt="보이기"
              width={24}
              height={24}
              className={styles.eyes}
              onClick={() => {
                SetShowedPWCheck(!showedPWCheck);
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
                SetShowedPWCheck(!showedPWCheck);
              }}
            />
          )}
          {errors?.passwordConfirmation?.message && (
            <p className={styles.error}>
              {errors?.passwordConfirmation?.message}
            </p>
          )}
          {errors?.passwordConfirmation?.type === 'validate' && (
            <p className={styles.error}>비밀번호가 일치하지 않습니다</p>
          )}
        </div>

        <button type="submit" disabled={!isFormValid}>
          회원가입
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
        <Link href="/login">
          <span>로그인</span>
        </Link>
      </div>
    </div>
  );
}
