"use client";

import { useState } from "react";
import Image from "next/image";
import SuggestedProducts from "./SuggestedProducts";
// Link removed; using a button to record orders before opening WhatsApp

export default function ProductDetails({ product, suggestedProducts }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [selectedSize, setSelectedSize] = useState(
    product.variants?.[0]?.sizes?.[0] || "",
  );

  const [selectedImage, setSelectedImage] = useState(
    product.variants?.[0]?.images?.[0]?.url,
  );

  const currentUrl = `https://kickxwear.in/products/${product.category}/${product.title.replace(/\s+/g, "-").toLowerCase()}`;

  // const handleVariantChange = (variant) => {
  //   setSelectedVariant(variant);
  //   setSelectedSize(variant.sizes?.[0] || "");
  //   setSelectedImage(variant.images?.[0]?.url);
  // };

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

  const handleOrderClick = async () => {
    const orderPayload = {
      product: {
        id: product._id || null,
        title: product.title,
        sku: product.sku,
        category: product.category,
      },
      variant: {
        colorName: selectedVariant?.colorName,
        size: selectedSize || null,
      },
      price: product.SP,
      quantity: 1,
      whatsappLink,
    };

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
    } catch (err) {
      console.error("Failed to record manual order:", err);
    }

    // Open WhatsApp in a new tab regardless of save result
    if (typeof window !== "undefined") {
      window.open(whatsappLink, "_blank");
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-4 md:py-8 scroll-mt-28">
      <div className="grid md:grid-cols-2 gap-2 md:gap-10">
        {/* Images */}
        <section aria-labelledby="product-images">
          <figure className="border border-black/20 rounded-xl p-6">
            <Image
              src={selectedImage}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-[200px] md:h-[450px] object-contain"
            />
          </figure>

          <div className="flex gap-1 md:gap-3 mt-1.5 md:mt-4 overflow-x-auto">
            {selectedVariant.images?.map((image) => (
              <button
                key={image.public_id}
                onClick={() => setSelectedImage(image.url)}
                className={`border rounded-xl cursor-pointer p-1 flex items-center ${
                  selectedImage === image.url
                    ? "border-black/20"
                    : "border-black/10"
                }`}
              >
                <Image
                  src={image.url}
                  alt=""
                  width={80}
                  height={80}
                  className="w-24 h-15 md:w-28 md:h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Details */}
        <article>
          <header>
            <h1 className="text-4xl font-bold">{product.title}</h1>
            {/* <div className="flex items-center gap-3 mt-1 md:mt-2">
              <span className="text-2xl font-bold">₹{product.SP}</span>
              <span className="line-through text-gray-400">₹{product.MRP}</span>
            </div> */}
            <p className="mt-4 text-gray-600 hidden md:block">
              {product.description?.text}
            </p>
          </header>

          {/* <section className="mt-8" aria-labelledby="product-color">
            <h2 id="product-color" className="font-semibold mb-3">
              Color
            </h2>

            {product.variants.length === 1 ? (
              <p className="text-gray-700">{selectedVariant.colorName}</p>
            ) : (
              <div className="flex gap-3">
                {product.variants.map((variant) => (
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
            )}
          </section> */}

          <section className="mt-3 md:mt-4" aria-labelledby="product-sizes">
            <h2 id="product-sizes" className="font-semibold mb-1 md:mb-2">
              Sizes
            </h2>

            <div className="flex gap-1 md:gap-2 flex-wrap">
              {selectedVariant.sizes?.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-lg border text-sm px-3 py-1 md:px-4 md:py-2 transition ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </section>

          <div className="mt-2 md:mt-4 text-xs md:text-sm">
            {selectedVariant.inStock ? (
              <span className="text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 md:mt-2">
            <span className="text-3xl font-bold">₹{product.SP}</span>
            <span className="line-through text-gray-400">₹{product.MRP}</span>
          </div>
          <button
            onClick={handleOrderClick}
            type="button"
            className="mt-2 md:mt-4 inline-flex px-6 py-3 rounded-lg bg-brand text-black hover:opacity-90"
          >
            Order Now
          </button>

          <section className="mt-4 mb-4" aria-labelledby="product-features">
            <p className="mt-2 text-gray-600 md:hidden block">
              {product.description?.text}
            </p>
          </section>
        </article>
      </div>
      <div className="w-full md:w-3/4 mt-4 md:mt-6">
        <h2
          id="product-features"
          className="text-3xl font-semibold uppercase tracking-[0.05em] underline mt-6 md:mt-4 mb-3"
        >
          Features
        </h2>

        <ul className="space-y-2">
          {product.description?.featured?.map((feature, index) => (
            <li key={index} className="text-gray-700">
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

      <SuggestedProducts
        products={suggestedProducts}
        category={product.category}
      />
    </main>
  );
}
