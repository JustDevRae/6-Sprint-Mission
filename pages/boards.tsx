import axios from "@/lib/axios";
import BestArticleSection from "@/components/BestArticleSection";
import AllArticleSection from "@/components/AllArticleSection";

export async function getServerSideProps() {
  const response = await axios.get("articles/?pageSize=3&orderBy=like");
  const articles = response.data.list ?? [];
  return {
    props: {
      articles,
    },
  };
}

export default function CommunityFeedPage({ articles }: any) {
  return (
    <>
      <BestArticleSection articles={articles} />
      <AllArticleSection />
    </>
  );
}
