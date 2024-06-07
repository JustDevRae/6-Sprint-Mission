import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import stylse from "@/styles/ProductDetailPage.module.css";
import Heart from "@/assets/images/icons/ic_heart.svg";
import Empty from "@/assets/images/ui/empty-comments.svg";
import Back from "@/assets/images/icons/ic_back.svg";
import { useEffect, useState } from "react";

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

      <form onSubmit={handleSubmit} className={stylse.questionSection}>
        <label className={stylse.questionLabel}>문의하기</label>
        <textarea
          value={value}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          className={stylse.questionInput}
          onChange={handleInput}
        />
        <button disabled={disabled} className={stylse.registerButton}>
          등록
        </button>
      </form>

      {productComments.length !== 0 ? (
        <div className={stylse.commentSection}>
          {productComments.map((comment: any) => (
            <div key={comment.id} className={stylse.commentWrapper}>
              <p className={stylse.content}>{comment.content}</p>
              <div className={stylse.userInfoWrapper}>
                <div className={stylse.userImageWrapper}>
                  <Image
                    src={comment.writer.image}
                    alt={comment.writer.nickname}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
                <div className={stylse.commentInfo}>
                  <p className={stylse.nickname}>{comment.writer.nickname}</p>
                  <p className={stylse.date}>{comment.createdAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={stylse.emptySection}>
          <div className={stylse.emptyImageWrapper}>
            <Image src={Empty} alt="빈 댓글" objectFit="cover" priority />
          </div>
          <p className={stylse.noComment}>아직 문의가 없습니다.</p>
        </div>
      )}

      <Link href="/items" style={{ textDecoration: "none" }}>
        <button className={stylse.backButton}>
          목록으로 돌아가기
          <Image src={Back} alt="목록으로 돌아가기 버튼" />
        </button>
      </Link>
    </>
  );
}
