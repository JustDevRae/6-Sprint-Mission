import ProductCard from "./ProductCard";
import styles from "@/components/AllProductSection.module.css";

export default function AllProductSection({ allProducts }: any) {
  console.log(allProducts);
  return (
    <>
      <div className={styles.allProductContainer}>
        <div>
          <h1 className={styles.allProductTitle}>전체 상품</h1>
        </div>

        <div className={styles.allProductList}>
          {allProducts?.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              className={styles.allProductImage}
            />
          ))}
        </div>
      </div>
    </>
  );
}
