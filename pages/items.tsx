import BestProductSection from "@/components/BestProductSection";
import AllProductSection from "@/components/AllProductSection";
import axios from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { Product } from "@/types/type";

interface MarketPageProps {
  initBestProducts: Product[];
  initAllProducts: Product[];
}

export async function getServerSideProps() {
  const bestProductsResponse = await axios.get(
    "products/?pageSize=4&orderBy=favorite"
  );
  const allProductsResponse = await axios.get("products/?orderBy=recent");

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

  const handleSortSeclection = (selectOrder: string) => {
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
      <BestProductSection bestProducts={bestProducts} />
      <AllProductSection
        allProducts={allProducts}
        onSortSelection={handleSortSeclection}
        onInputChange={handleInputChange}
      />
    </>
  );
}
