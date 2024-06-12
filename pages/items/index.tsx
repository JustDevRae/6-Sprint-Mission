import axios from "@/lib/axios";
import Link from "next/link";
import SearchForm from "@/components/ui/SearchForm/SearchForm";
import DropDownButton from "@/components/ui/DropDownButton/DropDownButton";
import React, { useEffect, useState } from "react";
import { Product } from "@/types/type";
import styles from "@/pages/items/MarketPage.module.css";
import ProductCard from "@/components/ui/ProductCard/ProductCard";

interface MarketPageProps {
  initBestProducts: Product[];
  initAllProducts: Product[];
}

export async function getServerSideProps() {
  const bestProductsResponse = await axios.get("products", {
    params: {
      pageSize: 4,
      orderBy: "favorite",
    },
  });
  const allProductsResponse = await axios.get("products", {
    params: {
      orderBy: "recent",
    },
  });

  const bestProductsData = bestProductsResponse.data?.list ?? [];
  const allProductsData = allProductsResponse.data?.list ?? [];
  return {
    props: {
      initBestProducts: bestProductsData,
      initAllProducts: allProductsData,
    },
  };
}

export default function MarketPage({
  initBestProducts,
  initAllProducts,
}: MarketPageProps) {
  const [bestProducts, setBestProducts] = useState<Product[]>(initBestProducts);
  const [allProducts, setAllProducts] = useState<Product[]>(initAllProducts);
  const [orderBy, setOrderBy] = useState("recent");
  const [inputValue, setInputValue] = useState("");

  const handleSortSelection = (selectOrder: string) => {
    setOrderBy(selectOrder);
  };

  const handleInputChange = (searchInput: string) => {
    setInputValue(searchInput);
  };

  useEffect(() => {
    const fetchSortedProducts = async () => {
      const response = await axios.get(
        `products/?orderBy=${orderBy}&keyword=${inputValue}`
      );
      setAllProducts(response.data.list ?? []);
    };

    fetchSortedProducts();
  }, [orderBy, inputValue]);

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
      <div className={styles.allProductContainer}>
        <div className={styles.allProductHeader}>
          <h1 className={styles.allProductTitle}>전체 상품</h1>

          <div className={styles.allProductHeaderRight}>
            <SearchForm
              onInputChange={handleInputChange}
              className={styles.allProductSearchBar}
            />
            <Link href="/additem">
              <button className={styles.addProductButton}>상품 등록하기</button>
            </Link>

            <DropDownButton onSortSelection={handleSortSelection} />
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
