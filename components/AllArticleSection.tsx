import Image from "next/image";
import formatDate from "@/util/formatDate";
import Heart from "@/assets/images/icons/ic_heart.svg";
import Search from "@/assets/images/icons/ic_search.svg";
import Profile from "@/assets/images/icons/ic_profile.svg";
import Sort from "@/assets/images/icons/ic_sort.svg";
import styles from "@/components/AllArticleSection.module.css";
import { Article } from "@/types/article";
import DropDownButton from "./DropDownButton";

export default function AllArticleSection({ allArticles, onSortSelection }: any) {
  return (
    <>
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
