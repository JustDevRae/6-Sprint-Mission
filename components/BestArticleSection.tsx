import formatDate from "@/util/formatDate";
import Image from "next/image";
import Heart from "@/public/images/icons/ic_heart.svg";
import Badge from "@/public/images/ui/best_badge.svg";
import styles from "@/components/BestArticleSection.module.css";
import { Article } from "@/types/type";

interface bestArticleProps {
  bestArticles: Article[];
}

export default function BestArticleSection({ bestArticles }: bestArticleProps) {
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
                <div className={styles.contentWrapper}>
                  <p className={styles.articleTitle}>{bestArticle.title}</p>
                  {bestArticle.image !== null ? (
                    <div className={styles.articleImageWrapper}>
                      <Image
                        src={bestArticle.image}
                        alt="상품이미지"
                        width={48}
                        height={48}
                        objectFit="cover"
                        priority
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>

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
