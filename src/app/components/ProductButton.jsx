"use client";

import { useRouter } from "next/navigation";
import React from "react";

const ProductButton = ({ category, product_name }) => {
  const router = useRouter();
  const slug = product_name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and") // Optional: Replace '&' with 'and'
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-");
  return (
    <button
      onClick={() => {
        router.push(`/products/${category}/${slug}`);
      }}
      className="mb-5 mx-4 cursor-pointer w-[calc(100%-2rem)] rounded-lg text-white bg-black  px-3 py-2 text-sm"
    >
      View Product
    </button>
  );
};

export default ProductButton;
