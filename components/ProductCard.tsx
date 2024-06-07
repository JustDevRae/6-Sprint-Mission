import Image from "next/image";
import Heart from "@/assets/images/icons/ic_heart.svg";
import styles from "@/components/ProductCard.module.css";
export default function ProductCard({ product, className = "" }: any) {
  return (
    <>
      <div className={styles.cardWrapper}>
        <div className={`${styles.imageWrapper} ${className}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        <p>{product.name}</p>
        <p>{product.price}원</p>

        <div className={styles.likeCountWrapper}>
          <Image src={Heart} alt="좋아요 수" />
          <p>{product.favoriteCount}</p>
        </div>
      </div>
    </>
  );
}
