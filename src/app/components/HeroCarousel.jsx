"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import shoe_1 from "../../assests/icons/shoe1.png";
import shoe_2 from "../../assests/icons/shoe2.png";
import shoe_3 from "../../assests/icons/shoe3.png";

export default function HeroCarousel() {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      slidesPerView={1}
    >
      <SwiperSlide>
        <Image src={shoe_1} alt="shoe 1" className="w-full h-auto" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={shoe_2} alt="shoe 2" className="w-full h-auto" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={shoe_3} alt="shoe 3" className="w-full h-auto" />
      </SwiperSlide>
    </Swiper>
  );
}