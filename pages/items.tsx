import BestProductSection from "@/components/BestProductSection";
import axios from "@/lib/axios";
import React, { useState } from "react";
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

export default function MarketPage({ initBestProducts, initAllProducts }: any) {
  const [bestProducts, setBestProducts] = useState(initBestProducts);
  const [allProducts, setAllProducts] = useState(initAllProducts);

  return (
    <>
      <BestProductSection bestProducts={bestProducts} />
    </>
  );
}
