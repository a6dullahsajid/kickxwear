"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "./Card";

const createProductSlug = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function SuggestedProducts({ products, category }) {
  const [swiper, setSwiper] = useState(null);

  if (!products?.length) return null;

  const categoryLabel = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <section
      className="mt-8 border-black/10 pt-4"
      aria-labelledby="suggested-products"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand">
            Keep exploring
          </p>
          <h2 id="suggested-products" className="mt-1 text-2xl font-semibold">
            More {categoryLabel}
          </h2>
        </div>

        <div className="gap-2 hidden md:flex">
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            aria-label="Previous suggested products"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 text-lg transition hover:bg-black hover:text-white"
          >
            <span aria-hidden="true">&#8592;</span>
          </button>
          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            aria-label="Next suggested products"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 text-lg transition hover:bg-black hover:text-white"
          >
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      </div>
      <Swiper
        onSwiper={setSwiper}
        spaceBetween={0}
        slidesPerView={1.5}
        breakpoints={{
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 5, spaceBetween: 0 },
        }}
        className="flex"
      >
        {products.map((product) => {
          const image = product.variants?.[0]?.images?.[0]?.url;

          if (!image) return null;

          return (
            <SwiperSlide key={product._id}>
              <div className="card overflow-hidden border pl-2 border-bg-lightgrey">
                <Card
                  href={`/products/${product.category}/${createProductSlug(product.title)}`}
                  image={image}
                  category={product.category}
                  title={product.title}
                  price={product.SP}
                  originalPrice={product.MRP}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
