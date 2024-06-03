import axios from "@/lib/axios";
import Image from "next/image";
import formatDate from "@/util/formatDate";
import Badge from "@/assets/images/ui/best_badge.svg";
import Heart from "@/assets/images/icons/ic_heart.svg";
import Search from "@/assets/images/icons/ic_search.svg";
import Profile from "@/assets/images/icons/ic_profile.svg";
import Sort from "@/assets/images/icons/ic_sort.svg";
import { useEffect, useState } from "react";
import styles from "@/styles/boards.module.css";
import { Article } from "@/types/article";

export default function CommunityFeedPage() {
  const [bestArticles, setBestArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  async function getBestArticle() {
    const response = await axios.get("articles/?pageSize=3&orderBy=like");
    const nextBestArticle = response.data.list ?? [];
    setBestArticles(nextBestArticle);
    console.log(nextBestArticle);
  }

  async function getAllArticle() {
    const response = await axios.get("articles");
    const nextAllArticle = response.data.list ?? [];
    setAllArticles(nextAllArticle);
    console.log(nextAllArticle);
  }

  useEffect(() => {
    getBestArticle();
    getAllArticle();
  }, []);

  return (
    <>
      <div className={styles.articleContainer}>
        <div className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>베스트 게시글</h1>
        </div>
        <div className={styles.bestArticleList}>
          {bestArticles?.map((bestArticle) => (
            <div key={bestArticle.id} className={styles.bestArticleWrapper}>
              <Image
                src={Badge}
                alt="베스트게시글 뱃지"
                style={{ position: "absolute", top: 0, left: 24 }}
              />
              <div className={styles.bestArticleContent}>
                <div className={styles.articleTitle}>{bestArticle.title}</div>
                <div className={styles.articleContentBottom}>
                  <div className={styles.allArticleBottomLeft}>
                    {bestArticle.writer.nickname}

                    <div className={styles.likeCountWrapper}>
                      <Image src={Heart} alt="좋아요 아이콘" />
                      {bestArticle.likeCount}
                    </div>
                  </div>
                  <div>{formatDate(bestArticle.createdAt)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.articleContainer}>
        <div className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>게시글</h1>
          <button className={styles.writeButton}>글쓰기</button>
        </div>
        <div className={styles.articleHeader}>
          <div className={styles.searchInputWrapper}>
            <Image
              src={Search}
              alt="검색 아이콘"
              style={{ position: "absolute", top: 9, left: 16 }}
            />
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              className={styles.searchInput}
            />
          </div>
          <button className={styles.sortButton}>
            최신순
            <Image src={Sort} alt="정렬 아이콘" />
          </button>
        </div>
        <div className="allArticleList">
          {allArticles.map((allArticle) => (
            <div key={allArticle.id} className={styles.allArticleWrapper}>
              <div className={styles.articleTitle}>{allArticle.title}</div>
              <div className={styles.articleContentBottom}>
                <div className={styles.allArticleBottomLeft}>
                  <Image src={Profile} alt="게시자 아이콘" />
                  <div>{allArticle.writer.nickname}</div>
                  <div>{formatDate(allArticle.createdAt)}</div>
                </div>
                <div className={styles.likeCountWrapper}>
                  <Image src={Heart} alt="좋아요 아이콘" />
                  <div>{allArticle.likeCount}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
