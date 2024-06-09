import ProductCard from "./ProductCard";
import Link from "next/link";
import styles from "@/components/AllProductSection.module.css";
import SearchForm from "./SearchForm";
import DropDownButton from "./DropDownButton";
import { Product } from "@/types/type";

interface AllProductProps {
  allProducts: Product[];
  onSortSelection: (value: string) => void;
  onInputChange: (event: string) => void;
}

export default function AllProductSection({
  allProducts,
  onSortSelection,
  onInputChange,
}: AllProductProps) {
  return (
    <>
      <div className={styles.allProductContainer}>
        <div className={styles.allProductHeader}>
          <h1 className={styles.allProductTitle}>전체 상품</h1>

          <div className={styles.allProductHeaderRight}>
            <SearchForm
              onInputChange={onInputChange}
              className={styles.allProductSearchBar}
            />
            <Link href="/additem">
              <button className={styles.addProductButton}>상품 등록하기</button>
            </Link>

            <DropDownButton onSortSelection={onSortSelection} />
          </div>
        </div>

        <div className={styles.allProductList}>
          {allProducts.map((product) => (
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
