import axios from "@/lib/axios";
import Image from "next/image";
import stylse from "@/styles/ProductDetailPage.module.css";
import Heart from "@/assets/images/icons/ic_heart.svg";

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
  console.log(productDetail);
  console.log(productComments);
  return (
    <>
      <div className={stylse.detailSection}>
        <div className={stylse.imageWrapper}>
          <Image
            src={productDetail.images[0]}
            alt={productDetail.name}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className={stylse.detailWrapper}>
          <div className={stylse.detailWrapperHeader}>
            <p className={stylse.productName}>{productDetail.name}</p>
            <p className={stylse.productPrice}>{productDetail.price}원</p>
          </div>
          <div className={stylse.detailWrapperMain}>
            <div className={stylse.introduceWrapper}>
              <p className={stylse.label}>상품 소개</p>
              <p className={stylse.productDescription}>
                {productDetail.description}
              </p>
            </div>

            <div className={stylse.tagWrapper}>
              <p className={stylse.label}>상품 태그</p>
              <div className={stylse.tagList}>
                {productDetail.tags.map((tag: any) => (
                  <div key={tag} className={stylse.tag}>
                    {`#${tag}`}
                  </div>
                ))}
              </div>
            </div>

            <div className={stylse.likeCountWrapper}>
              <Image src={Heart} alt="하트 아이콘" width={32} height={32} />
              {productDetail.favoriteCount}
            </div>
          </div>
        </div>
      </div>
      <div className="commentSection"></div>
    </>
  );
}
