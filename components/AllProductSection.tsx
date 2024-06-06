import ProductCard from "./ProductCard";
import Link from "next/link";
import styles from "@/components/AllProductSection.module.css";
import SearchForm from "./SearchForm";
import DropDownButton from "./DropDownButton";

export default function AllProductSection({
  allProducts,
  onSortSelection,
  onInputChange,
}: any) {
  return (
    <>
      <div className={styles.allProductContainer}>
        <div className={styles.allProductHeader}>
          <h1 className={styles.allProductTitle}>전체 상품</h1>

          <div className={styles.allProductHeaderRight}>
            <SearchForm
              onInputChange={onInputChange}
              clasName={styles.allProductSearchBar}
            />
            <Link href="/additem">
              <button className={styles.addProductButton}>상품 등록하기</button>
            </Link>

            <DropDownButton onSortSelection={onSortSelection} />
          </div>
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
