import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import BestArticleSection from "@/components/BestArticleSection";
import AllArticleSection from "@/components/AllArticleSection";

export async function getServerSideProps() {
  const response = await axios.get("articles/?pageSize=3&orderBy=like");
  const articles = response.data.list ?? [];
  return {
    props: {
      initArticles: articles,
    },
  };
}

export default function CommunityFeedPage({ initArticles }: any) {
  const [pageSize, setPageSize] = useState(3);
  const [articles, setArticles] = useState(initArticles);

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
    const fetchArticles = async () => {
      const response = await axios.get(
        `articles/?pageSize=${pageSize}&orderBy=like`
      );
      setArticles(response.data.list ?? []);
    };

    fetchArticles();
  }, [pageSize]);

  return (
    <>
      <BestArticleSection articles={articles} />
      <AllArticleSection />
    </>
  );
}
