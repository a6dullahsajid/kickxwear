"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import TestimonialCard from "./TestimoniaCard";

export default function TestimonialCarousel({ testimonials }) {
  return (
    <div className="testimonial-carousel pb-5 pt-10">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={"auto"}
        spaceBetween={20}
        loop
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id} className="!w-[250px] !h-[180px]">
            <TestimonialCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={"auto"}
        spaceBetween={20}
        loop
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: true,
        }}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={`reverse-${item.id}`} className="!w-[250px]">
            <TestimonialCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}