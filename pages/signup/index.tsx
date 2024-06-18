/* eslint-disable no-alert */
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/images/logo/logo.svg';
import Google from '@/public/images/social/google-logo.png';
import Kakao from '@/public/images/social/kakao-logo.png';
import Eyes from '@/public/images/icons/eye-visible.svg';
import NoEyes from '@/public/images/icons/eye-invisible.svg';
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
  } = useForm<Signup>({ mode: 'all' });
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
        alert('ȸ�����Լ���');
        router.replace('/login');
      })
      .catch(() => {
        alert('ȸ�����Խ���');
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center">
      <Link href="/">
        <Image
          className="mb-[40px] mt-[60px] h-[132px] w-[396px]"
          src={Logo}
          alt="ȸ������ ������ �ΰ�"
        />
      </Link>

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex flex-col">
          <label
            htmlFor="email"
            className="mb-[16px] text-[18px] font-bold leading-[21px]"
          >
            �̸���
          </label>

          <input
            {...register('email', {
              required: { value: true, message: '�̸����� �Է����ּ���' },
              pattern: {
                value: /^\S+@\S+$/i,
                message: '�߸��� �̸��� �����Դϴ�',
              },
            })}
            type="email"
            id="email"
            placeholder="�̸����� �Է����ּ���"
            className={`mb-[30px] h-[56px] w-[640px] rounded-[12px] bg-gray-200 px-[24px] py-[16px] text-[16px] font-normal leading-[24px] outline-none outline-offset-0 ${errors.email ? 'outline-red-error' : 'outline-blue-active'}`}
          />
          {errors?.email?.message && (
            <p className="absolute left-[10px] top-[100px] mr-[8px] text-[15px] font-semibold leading-[18px] text-red-error">
              {errors?.email?.message}
            </p>
          )}
        </div>

        <div className="relative flex flex-col">
          <label
            htmlFor="nickname"
            className="mb-[16px] text-[18px] font-bold leading-[21px]"
          >
            �г���
          </label>
          <input
            {...register('nickname', {
              required: '�г����� �Է����ּ���',
            })}
            type="text"
            id="nickname"
            placeholder="�г����� �Է����ּ���"
            className={`mb-[30px] h-[56px] w-[640px] rounded-[12px] bg-gray-200 px-[24px] py-[16px] text-[16px] font-normal leading-[24px] outline-none outline-offset-0 ${errors.nickname ? 'outline-red-error' : 'outline-blue-active'}`}
          />
          {errors?.nickname?.message && (
            <p className="absolute left-[10px] top-[100px] mr-[8px] text-[15px] font-semibold leading-[18px] text-red-error">
              {errors?.nickname?.message}
            </p>
          )}
        </div>

        <div className="relative flex flex-col">
          <label
            htmlFor="password"
            className="mb-[16px] text-[18px] font-bold leading-[21px]"
          >
            ��й�ȣ
          </label>
          <input
            {...register('password', {
              required: '��й�ȣ�� �Է����ּ���',
              minLength: { value: 8, message: '8�ڸ� �̻� �Է����ּ���' },
            })}
            type={showedPW ? 'text' : 'password'}
            id="password"
            placeholder="��й�ȣ�� �Է����ּ���"
            className={`mb-[30px] h-[56px] w-[640px] rounded-[12px] bg-gray-200 px-[24px] py-[16px] text-[16px] font-normal leading-[24px] outline-none outline-offset-0 ${errors.password ? 'outline-red-error' : 'outline-blue-active'}`}
          />
          {showedPW ? (
            <Image
              src={Eyes}
              alt="���̱�"
              width={24}
              height={24}
              className="absolute right-[24px] top-[53px] cursor-pointer"
              onClick={() => {
                SetShowedPW(!showedPW);
              }}
            />
          ) : (
            <Image
              src={NoEyes}
              alt="���̱�"
              width={24}
              height={24}
              className="absolute right-[24px] top-[53px] cursor-pointer"
              onClick={() => {
                SetShowedPW(!showedPW);
              }}
            />
          )}
          {errors?.password?.message && (
            <p className="absolute left-[10px] top-[100px] mr-[8px] text-[15px] font-semibold leading-[18px] text-red-error">
              {errors?.password?.message}
            </p>
          )}
        </div>

        <div className="relative flex flex-col">
          <label
            htmlFor="checkpassword"
            className="mb-[16px] text-[18px] font-bold leading-[21px]"
          >
            ��й�ȣ Ȯ��
          </label>
          <input
            {...register('passwordConfirmation', {
              required: '��й�ȣ�� �ٽ� �� �� �Է����ּ���',
              validate: (value) => value === formValues.passwordConfirmation,
            })}
            type={showedPWCheck ? 'text' : 'password'}
            id="checkpassword"
            placeholder="��й�ȣ�� �ٽ� �� �� �Է����ּ���"
            className={`mb-[30px] h-[56px] w-[640px] rounded-[12px] bg-gray-200 px-[24px] py-[16px] text-[16px] font-normal leading-[24px] outline-none outline-offset-0 ${errors.passwordConfirmation ? 'outline-red-error' : 'outline-blue-active'}`}
          />
          {showedPWCheck ? (
            <Image
              src={Eyes}
              alt="���̱�"
              width={24}
              height={24}
              className="absolute right-[24px] top-[53px] cursor-pointer"
              onClick={() => {
                SetShowedPWCheck(!showedPWCheck);
              }}
            />
          ) : (
            <Image
              src={NoEyes}
              alt="���̱�"
              width={24}
              height={24}
              className="absolute right-[24px] top-[53px] cursor-pointer"
              onClick={() => {
                SetShowedPWCheck(!showedPWCheck);
              }}
            />
          )}
          {errors?.passwordConfirmation?.message && (
            <p className="absolute left-[10px] top-[100px] mr-[8px] text-[15px] font-semibold leading-[18px] text-red-error">
              {errors?.passwordConfirmation?.message}
            </p>
          )}
          {errors?.passwordConfirmation?.type === 'validate' && (
            <p className="absolute left-[10px] top-[100px] mr-[8px] text-[15px] font-semibold leading-[18px] text-red-error">
              ��й�ȣ�� ��ġ���� �ʽ��ϴ�
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="hover: h-[56px] w-[640px] cursor-pointer rounded-[40px] bg-blue-active text-[20px] font-semibold leading-[24px] text-white hover:bg-blue-hover disabled:bg-gray-400"
        >
          ȸ������
        </button>
      </form>
      <div className="my-[24px] flex h-[74px] w-[640px] items-center justify-between rounded-[8px] bg-[#e6f2ff] px-[23px] py-[16px]">
        <p className="text-[16px] font-medium leading-[24px] text-gray-800">
          ���� �α����ϱ�
        </p>
        <div className="flex gap-[16px]">
          <Image src={Google} alt="���� �α���" width={42} height={42} />
          <Image src={Kakao} alt="īī���� �α���" width={42} height={42} />
        </div>
      </div>
      <div className="text-[15px] font-medium leading-[18px]">
        �Ǵٸ����� ó���̽Ű���?
        <Link href="/login">
          <span className="text-[#3182f6]">�α���</span>
        </Link>
      </div>
    </div>
  );
}
