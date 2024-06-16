import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TopBanner from '@/public/images/home/hero-image.png';
import Home1 from '@/public/images/home/feature1-image.png';
import Home2 from '@/public/images/home/feature2-image.png';
import Home3 from '@/public/images/home/feature3-image.png';
import BottomBanner from '@/public/images/home/bottom-banner-image.png';
import Meta from '@/public/images/social/facebook-logo.svg';
import Twitter from '@/public/images/social/twitter-logo.svg';
import Youtube from '@/public/images/social/youtube-logo.svg';
import Instagram from '@/public/images/social/instagram-logo.svg';

export default function Home() {
  return (
    <>
      <div className="relative h-[540px] w-full bg-banner">
        <div className="absolute left-[358px] top-[183px] flex flex-col gap-[32px]">
          <p className="text-[40px] font-bold leading-[56px]">
            일상의 모든 물건을
            <br />
            거래해보세요
          </p>
          <Link href="/items">
            <button
              type="button"
              className="h-[56px] w-[357px] rounded-[40px] bg-blue-active text-center text-[20px] font-semibold leading-6 text-white hover:bg-blue-hover"
            >
              구경하러 가기
            </button>
          </Link>
        </div>
        <Image
          src={TopBanner}
          alt="상단배너이미지"
          width={996}
          height={447}
          className="absolute left-[701px] top-[93px]"
        />
      </div>
      <main className="mx-auto flex w-full flex-col items-center">
        <section className="my-[138px] flex items-center gap-[64px]">
          <Image src={Home1} alt="홈 이미지1" width={588} height={444} />
          <div className="flex flex-col">
            <p className="pb-3 text-[18px] font-bold leading-6 text-blue-active">
              Hot Item
            </p>
            <h1 className="pb-3 text-[40px] font-bold leading-[56px] text-gray-700">
              인기상품을
              <br />
              확인해보세요
            </h1>
            <h3 className="text-[24px] font-medium leading-7 text-gray-700">
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해보세요
            </h3>
          </div>
        </section>

        <section className="my-[138px] flex items-center gap-[64px]">
          <div className="flex flex-col">
            <p className="pb-3 text-[18px] font-bold leading-6 text-blue-active">
              Search
            </p>
            <h1 className="pb-3 text-[40px] font-bold leading-[56px] text-gray-700">
              구매를 원하는
              <br />
              상품을 검색하세요
            </h1>
            <h3 className="text-[24px] font-medium leading-7 text-gray-700">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </h3>
          </div>
          <Image src={Home2} alt="홈 이미지2" width={588} height={444} />
        </section>
        <section className="my-[138px] flex items-center gap-[64px]">
          <Image src={Home3} alt="홈 이미지3" width={588} height={444} />
          <div className="flex flex-col">
            <p className="pb-3 text-[18px] font-bold leading-6 text-blue-active">
              Register
            </p>
            <h1 className="pb-3 text-[40px] font-bold leading-[56px] text-gray-700">
              판매를 원하는
              <br />
              상품을 등록하세요
            </h1>
            <h3 className="text-[24px] font-medium leading-7 text-gray-700">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </h3>
          </div>
        </section>
      </main>
      <div className="relative h-[540px] w-full bg-banner">
        <p className="absolute left-[337px] top-[214px] text-[40px] font-bold leading-[56px] text-gray-700">
          믿을 수 있는
          <br />
          판다마켓 중고 거래
        </p>
        <Image
          src={BottomBanner}
          alt="바텀 배너 이미지"
          width={996}
          height={540}
          className="absolute left-[701px] top-0"
        />
      </div>
      <footer className="flex h-[160px] w-full justify-around bg-footer pt-[32px]">
        <div className="text-[16px] font-normal leading-5 text-gray-200">
          ©codeit - 2024
        </div>
        <div className="flex gap-[30px] text-[16px] font-normal leading-5 text-gray-200">
          <div>Privacy Policy</div>
          <div>FAQ</div>
        </div>
        <div className="flex items-start gap-[12px]">
          <Image src={Meta} alt="메타 아이콘" width={20} height={20} />
          <Image src={Twitter} alt="트위터 아이콘" width={20} height={20} />
          <Image src={Youtube} alt="유튜브 아이콘" width={20} height={20} />
          <Image
            src={Instagram}
            alt="인스타그램 아이콘"
            width={20}
            height={20}
          />
        </div>
      </footer>
    </>
  );
}
