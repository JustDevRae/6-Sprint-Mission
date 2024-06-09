import Image from "next/image";
import Link from "next/link";
import Heart from "@/public/images/icons/ic_heart.svg";
import styles from "@/components/ProductCard.module.css";
import { Product } from "@/types/type";

interface ProductCardProps {
  product: Product;
  className: string;
}

export default function ProductCard({
  product,
  className = "",
}: ProductCardProps) {
  return (
    <>
      <Link href={`/items/${product.id}`} style={{ textDecoration: "none" }}>
        <div className={styles.cardWrapper}>
          <div className={`${styles.imageWrapper} ${className}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              priority
              style={{ borderRadius: 16 }}
            />
          </div>

          <p className={styles.name}>{product.name}</p>
          <p className={styles.price}>{product.price}원</p>

          <div className={styles.likeCountWrapper}>
            <Image src={Heart} alt="좋아요 수" />
            <p className={styles.favoriteCount}>{product.favoriteCount}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
