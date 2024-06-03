import axios from "@/lib/axios";
import formatDate from "@/util/formatDate";
import { Article } from "@/types/article";
import { useEffect, useState } from "react";
import Image from "next/image";
import Heart from "@/assets/images/icons/ic_heart.svg";
import Badge from "@/assets/images/ui/best_badge.svg";
import styles from "@/components/BestArticleSection.module.css";

export default function BestArticleSection() {
  const [bestArticles, setBestArticles] = useState<Article[]>([]);

  async function getBestArticle() {
    const response = await axios.get("articles/?pageSize=3&orderBy=like");
    const nextBestArticle = response.data.list ?? [];
    setBestArticles(nextBestArticle);
    console.log(nextBestArticle);
  }

  useEffect(() => {
    getBestArticle();
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
                  <div className={styles.bestArticleBottomLeft}>
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
    </>
  );
}
