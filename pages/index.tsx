import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/pages/HomePage.module.css';
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
      <div className={styles.top_banner}>
        <div className={styles.top_banner_wrapper}>
          <p className={styles.top_banner_description}>
            일상의 모든 물건을
            <br />
            거래해보세요
          </p>
          <Link href="/items">
            <button type="button" className={styles.top_banner_button}>
              구경하러 가기
            </button>
          </Link>
        </div>
        <Image src={TopBanner} alt="상단배너이미지" width={996} height={447} />
      </div>
      <div className={styles.main}>
        <div className={styles.section}>
          <Image src={Home1} alt="홈 이미지1" width={588} height={444} />
          <div className={styles.section_text_wrapper}>
            <p>Hot Item</p>
            <h1>
              인기상품을
              <br />
              확인해보세요
            </h1>
            <h3>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해보세요
            </h3>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.section_text_wrapper}>
            <p>Search</p>
            <h1>
              구매를 원하는
              <br />
              상품을 검색하세요
            </h1>
            <h3>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </h3>
          </div>
          <Image src={Home2} alt="홈 이미지2" width={588} height={444} />
        </div>
        <div className={styles.section}>
          <Image src={Home3} alt="홈 이미지3" width={588} height={444} />
          <div className={styles.section_text_wrapper}>
            <p>Register</p>
            <h1>
              판매를 원하는
              <br />
              상품을 등록하세요
            </h1>
            <h3>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </h3>
          </div>
        </div>
      </div>
      <div className={styles.bottom_banner}>
        <p>
          믿을 수 있는
          <br />
          판다마켓 중고 거래
        </p>
        <Image
          src={BottomBanner}
          alt="바텀 배너 이미지"
          width={996}
          height={540}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.page_info}>©codeit - 2024</div>
        <div className={styles.important_info}>
          <div>Privacy Policy</div>
          <div>FAQ</div>
        </div>
        <div className={styles.footer_icons}>
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
      </div>
    </>
  );
}
