"use client";

import { useRouter } from "next/navigation";
import React from "react";

const ProductButton = ({ category, product_id }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(`/products/${category}/${product_id}`);
      }}
      className="mb-5 mx-4 cursor-pointer w-[calc(100%-2rem)] rounded-lg text-white bg-black  px-3 py-2 text-sm"
    >
      View Product
    </button>
  );
};

export default ProductButton;
