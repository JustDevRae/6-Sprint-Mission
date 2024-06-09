import axios from "@/lib/axios";
import React, { useEffect, useState } from "react";
import BestArticleSection from "@/components/BestArticleSection";
import AllArticleSection from "@/components/AllArticleSection";
import { Article } from "@/types/type";

interface CommunityFeedPageProps {
  initBestArticles: Article[];
  initAllArticles: Article[];
}

export async function getServerSideProps() {
  const besrtArticleResponse = await axios.get(
    "articles/?pageSize=3&orderBy=like"
  );
  const allArticleResponse = await axios.get("articles/?orderBy=like");
  const bestArticlesData = besrtArticleResponse.data?.list ?? [];
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

  const handleSortSeclection = (selectOrder: string) => {
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
      <BestArticleSection bestArticles={bestArticles} />
      <AllArticleSection
        allArticles={allArticles}
        onSortSelection={handleSortSeclection}
        onInputChange={handleInputChange}
      />
    </>
  );
}
