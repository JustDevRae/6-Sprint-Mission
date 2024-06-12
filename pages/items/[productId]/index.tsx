import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import styles from "@/pages/items/[productId]/ProductDetailPage.module.css";
import Heart from "@/public/images/icons/ic_heart.svg";
import Empty from "@/public/images/ui/empty-comments.svg";
import Back from "@/public/images/icons/ic_back.svg";
import { useEffect, useState } from "react";
import { Product, Comment } from "@/types/type";
import formatTimeAgo from "@/util/formatTimeAgo";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const productId = context.params?.productId as string;

  const [productResponse, commentsResponse] = await Promise.all([
    axios.get(`products/${productId}`),
    axios.get(`products/${productId}/comments`, {
      params: {
        limit: 3,
      },
    }),
  ]);

  const productDetailData = productResponse.data;
  const productCommentsData = commentsResponse.data?.list ?? [];

  return {
    props: {
      productDetail: productDetailData,
      productComments: productCommentsData,
    },
  };
}

interface ProductDetailPageProps {
  productDetail: Product;
  productComments: Comment[];
}

export default function ProductDetailPage({
  productDetail,
  productComments,
}: ProductDetailPageProps) {
  const [value, setValue] = useState<string>("");
  const [disabled, setDisabled] = useState(true);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (value !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [value]);

  return (
    <>
      <div className={styles.detailSection}>
        <div className={styles.imageWrapper}>
          <Image
            src={productDetail.images[0]}
            alt={productDetail.name}
            layout="fill"
            objectFit="cover"
            priority
            style={{ borderRadius: 16 }}
          />
        </div>
        <div className={styles.detailWrapper}>
          <div className={styles.detailWrapperHeader}>
            <p className={styles.productName}>{productDetail.name}</p>
            <p className={styles.productPrice}>
              {productDetail.price.toLocaleString()}원
            </p>
          </div>
          <div className={styles.detailWrapperMain}>
            <div className={styles.introduceWrapper}>
              <p className={styles.label}>상품 소개</p>
              <p className={styles.productDescription}>
                {productDetail.description}
              </p>
            </div>

            <div className={styles.tagWrapper}>
              <p className={styles.label}>상품 태그</p>
              <div className={styles.tagList}>
                {productDetail.tags.map((tag) => (
                  <div key={tag} className={styles.tag}>
                    {`#${tag}`}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.likeCountWrapper}>
              <Image src={Heart} alt="하트 아이콘" width={32} height={32} />
              {productDetail.favoriteCount}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.questionSection}>
        <label className={styles.questionLabel}>문의하기</label>
        <textarea
          value={value}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          className={styles.questionInput}
          onChange={handleInput}
        />
        <button disabled={disabled} className={styles.registerButton}>
          등록
        </button>
      </form>

      {productComments.length !== 0 ? (
        <div className={styles.commentSection}>
          {productComments.map((comment) => (
            <div key={comment.id} className={styles.commentWrapper}>
              <p className={styles.content}>{comment.content}</p>
              <div className={styles.userInfoWrapper}>
                <div className={styles.userImageWrapper}>
                  <Image
                    src={comment.writer.image}
                    alt={comment.writer.nickname}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
                <div className={styles.commentInfo}>
                  <p className={styles.nickname}>{comment.writer.nickname}</p>
                  <p className={styles.date}>
                    {formatTimeAgo(comment.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptySection}>
          <div className={styles.emptyImageWrapper}>
            <Image src={Empty} alt="빈 댓글" objectFit="cover" priority />
          </div>
          <p className={styles.noComment}>아직 문의가 없습니다.</p>
        </div>
      )}

      <Link href="/items">
        <button className={styles.backButton}>
          목록으로 돌아가기
          <Image src={Back} alt="목록으로 돌아가기 버튼" />
        </button>
      </Link>
    </>
  );
}
