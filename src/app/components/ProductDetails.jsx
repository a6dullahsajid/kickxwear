"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetails({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [selectedSize, setSelectedSize] = useState(
    product.variants?.[0]?.sizes?.[0] || "",
  );

  const [selectedImage, setSelectedImage] = useState(
    product.variants?.[0]?.images?.[0]?.url,
  );

  const currentUrl = `https://kickxwear.in/products/${product.category}/${product._id}`;

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedSize(variant.sizes?.[0] || "");
    setSelectedImage(variant.images?.[0]?.url);
  };

  const whatsappLink = `https://wa.me/918707697774?text=${encodeURIComponent(
    `Hi, I want to order this product from Kickxwear.
*Product:* ${product.title}
*SKU:* ${product.sku}
*Category:* ${product.category}
*Color:* ${selectedVariant.colorName}
*Size:* ${selectedSize || "N/A"}
*Price:* ₹${product.SP}
*Quantity:* 1

*Product Link:* ${currentUrl || "[link unavailable]"}

Please confirm availability and next steps.`,
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 scroll-mt-28">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="border border-black/30 rounded-xl p-6">
            <Image
              src={selectedImage}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-[300px] md:h-[500px] object-contain"
            />
          </div>

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {selectedVariant.images?.map((image) => (
              <button
                key={image.public_id}
                onClick={() => setSelectedImage(image.url)}
                className={`border rounded-xl cursor-pointer p-1 ${
                  selectedImage === image.url
                    ? "border-black/30"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image.url}
                  alt=""
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold">₹{product.SP}</span>

            <span className="line-through text-gray-400">₹{product.MRP}</span>
          </div>

          <p className="mt-6 text-gray-600">{product.description?.text}</p>

          {/* Colors */}
          <div className="mt-8">
            <h3 className="font-semibold mb-3">Color</h3>

            <div className="flex gap-3">
              {product.variants?.map((variant) => (
                <button
                  key={variant.colorName}
                  onClick={() => handleVariantChange(variant)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedVariant.colorName === variant.colorName
                      ? "border-black bg-black text-white"
                      : "border-gray-300"
                  }`}
                >
                  {variant.colorName}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-8">
            <h3 className="font-semibold mb-3">Sizes</h3>

            <div className="flex gap-2 flex-wrap">
              {selectedVariant.sizes?.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-lg border px-4 py-2 transition ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock */}
          <div className="mt-6">
            {selectedVariant.inStock ? (
              <span className="text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex px-6 py-3 rounded-lg bg-brand text-black hover:opacity-90"
          >
            Order Now
          </Link>

          {/* Features */}
          <div className="mt-8">
            <h3 className="text-3xl font-semibold underline mb-3">Features</h3>

            <ul className="space-y-2">
              {product.description?.featured?.map((feature, index) => (
                <li key={index}>
                  {
                    <span>
                      {feature
                        .split("*")
                        .map((p, i) =>
                          i % 2 === 1 ? <strong key={i}>{p}</strong> : p,
                        )}
                    </span>
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
