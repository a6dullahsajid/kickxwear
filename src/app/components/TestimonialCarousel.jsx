"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import TestimonialCard from "./TestimoniaCard";
import ScrollReveal from "./ScrollReveal";

export default function TestimonialCarousel({ testimonials }) {
  return (
    <div className="testimonial-carousel pb-5 pt-10 overflow-hidden">
      
      {/* 1. First Row: Slides in immediately */}
      <ScrollReveal delay={0.1}>
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
          className="mb-5" // Added a slight margin bottom for spacing
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="!w-[250px] !h-[180px]">
              <TestimonialCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </ScrollReveal>

      {/* 2. Second Row: Slides in slightly after the first row */}
      <ScrollReveal delay={0.3}>
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
      </ScrollReveal>
      
    </div>
  );
}