import ProductCard from "./ProductCard";
import styles from "@/components/BestProductSection.module.css";
export default function BestProductSection({ bestProducts }: any) {
  console.log(bestProducts);
  return (
    <>
      <div className={styles.bestProductsContainer}>
        <h1 className={styles.bestProductTitle}>베스트 상품</h1>
        <div className={styles.bestProductsList}>
          {bestProducts?.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
