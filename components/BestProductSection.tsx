import ProductCard from "./ProductCard";
import styles from "@/components/BestProductSection.module.css";
import { Product } from "@/types/type";

interface BestProductProps {
  bestProducts: Product[];
}

export default function BestProductSection({ bestProducts }: BestProductProps) {
  return (
    <>
      <div className={styles.bestProductsContainer}>
        <h1 className={styles.bestProductTitle}>베스트 상품</h1>
        <div className={styles.bestProductsList}>
          {bestProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className={styles.bestProductImage}
            />
          ))}
        </div>
      </div>
    </>
  );
}
