import Image from "next/image";
import formatDate from "@/util/formatDate";
import Heart from "@/assets/images/icons/ic_heart.svg";
import Profile from "@/assets/images/icons/ic_profile.svg";
import styles from "@/components/AllArticleSection.module.css";
import { Article } from "@/types/article";
import DropDownButton from "./DropDownButton";
import SearchForm from "./SearchForm";

export default function AllArticleSection({
  allArticles,
  onSortSelection,
  onInputChange,
}: any) {
  return (
    <>
      <div className={styles.articleContainer}>
        <div className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>게시글</h1>
          <button className={styles.writeButton}>글쓰기</button>
        </div>
        <div className={styles.articleHeader}>
          <SearchForm onInputChange={onInputChange} />
          <DropDownButton onSortSelection={onSortSelection} />
        </div>
        <div className="allArticleList">
          {allArticles.map((allArticle: any) => (
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
