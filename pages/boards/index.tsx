import formatDate from "@/util/formatDate";
import Image from "next/image";
import Heart from "@/public/images/icons/ic_heart.svg";
import Badge from "@/public/images/ui/best_badge.svg";
import styles from "@/pages/boards/CommunityFeedPage.module.css";
import axios from "@/lib/axios";
import React, { useEffect, useState } from "react";
import DropDownButton from "@/components/ui/DropDownButton/DropDownButton";
import SearchForm from "@/components/ui/SearchForm/SearchForm";
import Profile from "@/public/images/icons/ic_profile.svg";
import { Article } from "@/types/type";

interface CommunityFeedPageProps {
  initBestArticles: Article[];
  initAllArticles: Article[];
}

export async function getServerSideProps() {
  const bestArticleResponse = await axios.get("articles", {
    params: {
      pageSize: 3,
      orderBy: "like",
    },
  });
  const allArticleResponse = await axios.get("articles", {
    params: {
      orderBy: "like",
    },
  });
  const bestArticlesData = bestArticleResponse.data?.list ?? [];
  const allArticlesData = allArticleResponse.data?.list ?? [];
  return {
    props: {
      initBestArticles: bestArticlesData,
      initAllArticles: allArticlesData,
    },
  };
}

export default function CommunityFeedPage({
  initBestArticles,
  initAllArticles,
}: CommunityFeedPageProps) {
  const [pageSize, setPageSize] = useState(3);
  const [bestArticles, setBestArticles] = useState<Article[]>(initBestArticles);
  const [allArticles, setAllArticles] = useState<Article[]>(initAllArticles);
  const [orderBy, setOrderBy] = useState("recent");
  const [inputValue, setInputValue] = useState("");

  const getPageSize = () => {
    const width = window.innerWidth;
    if (width < 768) {
      return 1;
    } else if (width < 1280) {
      return 2;
    } else {
      return 3;
    }
  };

  const handleSortSelection = (selectOrder: string) => {
    setOrderBy(selectOrder);
  };

  const handleInputChange = (searchInput: string) => {
    setInputValue(searchInput);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchBestArticlesCount = async () => {
      const response = await axios.get(
        `articles/?pageSize=${pageSize}&orderBy=like`
      );
      setBestArticles(response.data.list ?? []);
    };

    fetchBestArticlesCount();
  }, [pageSize]);

  useEffect(() => {
    const fetchSortedArticle = async () => {
      const response = await axios.get(
        `articles/?orderBy=${orderBy}&keyword=${inputValue}`
      );
      setAllArticles(response.data.list ?? []);
    };

    fetchSortedArticle();
  }, [orderBy, inputValue]);

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
                <div className={styles.bestContentWrapper}>
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

                <div className={styles.bestArticleContentBottom}>
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
      <div className={styles.articleContainer}>
        <div className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>게시글</h1>
          <button className={styles.writeButton}>글쓰기</button>
        </div>
        <div className={styles.articleHeader}>
          <SearchForm
            onInputChange={handleInputChange}
            className={styles.allArticleSearchBar}
          />
          <DropDownButton onSortSelection={handleSortSelection} />
        </div>
        <div className={styles.allArticleList}>
          {allArticles.map((allArticle) => (
            <div key={allArticle.id} className={styles.allArticleWrapper}>
              <div className={styles.allContentWrapper}>
                <div className={styles.articleTitle}>{allArticle.title}</div>
                {allArticle.image !== null ? (
                  <div className={styles.articleImageWrapper}>
                    <Image
                      src={allArticle.image}
                      alt="상품이미지"
                      width={48}
                      height={48}
                      objectFit="cover"
                      priority
                    />
                  </div>
                ) : (
                  <div style={{ width: 72, height: 72 }}></div>
                )}
              </div>

              <div className={styles.allArticleContentBottom}>
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
