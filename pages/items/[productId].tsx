import axios from "@/lib/axios";
import stylse from "@/styles/ProductDetailPage.module.css";

export async function getServerSideProps(context: any) {
  const productId = context.params["productId"];
  const productResponse = await axios.get(`/products/${productId}`);
  const commentsResponse = await axios.get(
    `/products/${productId}/comments?limit=3`
  );
  const prductDetailData = productResponse.data;
  const prductCommentsData = commentsResponse.data?.list ?? [];

  return {
    props: {
      productDetail: prductDetailData,
      productComments: prductCommentsData,
    },
  };
}

export default function ProductDetailPage({
  productDetail,
  productComments,
}: any) {
  return (
    <>
      <div className="detailSection"></div>
      <div className="commentSection"></div>
    </>
  );
}
