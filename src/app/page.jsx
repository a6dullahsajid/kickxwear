"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Archivo_Black } from "next/font/google";
import shoe_1 from "../assests/icons/shoe1.png";
import shoe_2 from "../assests/icons/shoe2.png";
import shoe_3 from "../assests/icons/shoe3.png";
import shadow from "../assests/icons/shadow.png";
import shipping from "../assests/icons/shiping.png";
import payment from "../assests/icons/payment.png";
import support from "../assests/icons/support.png";
import jersey from "../assests/icons/jersey.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Card from "./components/Card";
import { getFeaturedProducts } from "./lib/products";

import "swiper/css";

const products = await getFeaturedProducts();

console.log(products)

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <div className="main">
      <div className="hero-section bg-bg-lightgrey pt-20 pb-40 md:pt-40 md:pb-40 lg:pt-30 lg:pb:35 flex flex-col justify-center items-center">
        <div className="relative flex flex-col">
          <h1
            className={`m-0 p-0 tracking-tight scale-y-125 text-center leading-25 md:leading-40 text-[100px] text-[100px] sm:text-[150px] md:text-[200px] text-white ${archivo.className}`}
          >
            WALK <br /> BOLD
          </h1>
        </div>

        <div className="absolute top-25 md:top-30 w-full max-w-[350px] md:max-w-[550px] z-20">
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
              <Image
                src={shoe_1}
                alt="shoe 1"
                className="w-full h-auto"
                width={500}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Image src={shoe_2} alt="shoe 2" className="w-full h-auto" />
            </SwiperSlide>

            <SwiperSlide>
              <Image src={shoe_3} alt="shoe 3" className="w-full h-auto" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="absolute w-full max-w-[1000px]">
          <Image src={shadow} alt="shadow" />
        </div>

        <div className="absolute cta-button z-30 flex flex-col md:flex-row gap-5 top-105 md:top-155">
          <button className="bg-brand text-black border-[1px] text-[12px] rounded-full pt-[8px] pb-[8px] pl-[5px] pr-[5px] w-[300px] md:w-[200px] h-[45px] border-black ">
            Chat and Order On Whatsapp
          </button>
          <button className="bg-white text-black border-[1px] text-[12px] rounded-full pt-[8px] pb-[8px] pl-[5px] pr-[5px] w-[300px] md:w-[200px] h-[45px] border-black ">
            Explore Products
          </button>
        </div>
      </div>
      <div className="services-section flex flex-col md:flex-row gap-12 justify-between pt-[50px] lg:pt-[60px] pb-[50px] pl-[30px] pr-[30px] xl:pl-[100px] xl:pr-[100px] border-t border-b  border-brand">
        <div className="flex md:flex-col lg:flex-row gap-7 items-center border-b md:border-b-0 md:border-r pb-5 md:pr-20 border-b-gray-300 md:border-r-gray-300">
          <Image src={shipping} alt="shipping" width={52} />
          <div>
            <h2 className="text-[14px] lg:text-[16px]">Free Shipping</h2>
            <p className="text-[12px] lg:text-[14px] text-gray-500">
              Free Shipping on orders above 999
            </p>
          </div>
        </div>
        <div className="flex md:flex-col lg:flex-row gap-7 items-center border-b md:border-b-0 md:border-r pb-5 md:pr-20 border-b-gray-300 md:border-r-gray-300">
          <Image src={payment} alt="payment" width={52} />
          <div>
            <h2 className="text-[14px] lg:text-[16px]">Flexible Payment</h2>
            <p className="text-[12px] lg:text-[14px] text-gray-500">
              Multiple Secure Payment Options
            </p>
          </div>
        </div>
        <div className="flex md:flex-col lg:flex-row gap-7 items-center border-b md:border-b-0 pb-5 md:pr-5 border-b-gray-300 m">
          <Image src={support} alt="support" width={52} />
          <div>
            <h2 className="text-[14px] lg:text-[16px]">24x7 Support</h2>
            <p className="text-[12px] lg:text-[14px] text-gray-500">
              We support online all days on Instagram
            </p>
          </div>
        </div>
      </div>
      <div className="category-section flex flex-col md:flex-row gap-10 justify-center items-center pt-[50px] pb-[50px] pr-[20px] pl-[20px] border-t border-b  border-brand">
        <div className="min-w-[280px] w-full max-w-[350px] md:max-w-[400px] flex flex-col justify-between gap-6 lg:gap-4 bg-[#E6E6E6] rounded-4xl p-5">
          <div className="price-label bg-white w-fit pl-3 pt-2 pb-2 pr-3 rounded-[50px] ">
            <p className="text-[12px]">
              <span className="text-brand">500+</span> Items
            </p>
          </div>
          <div className="text-gray-500">
            <h3 className="text-[28px] font-semibold text-black">Shoes</h3>
            <p className="text-[14px] text-gray-600 mt-2">
              Footwear engineered for sport and designed for everyday life.
            </p>
            <p className="text-[14px] mt-2">Football Shoes</p>
            <p className="text-[14px] mt-2">Sports Shoes</p>
            <p className="text-[14px] mt-2">Casual Shoes</p>
          </div>
          <Image src={shoe_1} alt="shoe1" width={300} className="" />
        </div>

        <div className="flex flex-col  gap-10 min-w-[280px] w-full max-w-[350px] md:max-w-[420px]">
        <div className="min-w-[280px] w-full max-w-[350px] md:max-w-[420px] flex flex-col justify-between gap-6 bg-[#E6E6E6] rounded-4xl p-5">
          <div className="price-label bg-white w-fit pl-3 pt-2 pb-2 pr-3 rounded-[50px] ">
            <p className="text-[12px]">
              <span className="text-brand">500+</span> Items
            </p>
          </div>
          <div className="flex relative">
            <div>
              <div className="text-gray-500">
                <h3 className="text-[28px] font-semibold text-black">Jersey</h3>
                <p className="text-[14px] text-gray-600 mt-2 max-w-[140px] md:max-w-[180px] lg:max-w-[200px]">
                  Authentic-inspired football jerseys from the world's biggest clubs. Represent your team with pride, on match day and every day.
                </p>
                {/* <p className="text-[14px] mt-2">Football Shoes</p>
                <p className="text-[14px] mt-2">Sports Shoes</p>
                <p className="text-[14px] mt-2">Casual Shoes</p> */}
              </div>
            </div>
            <div className="absolute right-[-25] bottom-[-18]">
              <Image src={jersey} alt="shoe1" width={150} className="" />
            </div>
          </div>
        </div>
        <div className="min-w-[280px] w-full max-w-[350px] md:max-w-[420px] flex flex-col justify-between gap-6 bg-[#E6E6E6] rounded-4xl p-5">
          <div className="price-label bg-white w-fit pl-3 pt-2 pb-2 pr-3 rounded-[50px] ">
            <p className="text-[12px]">
              <span className="text-brand">500+</span> Items
            </p>
          </div>
          <div className="flex relative">
            <div>
              <div className="text-gray-500">
                <h3 className="text-[28px] font-semibold text-black">Accessories</h3>
                <p className="text-[14px] text-gray-600 mt-2 max-w-[140px] md:max-w-[180px] lg:max-w-[200px]">
                 Premium sports accessories for athletes and champions. Built for training, competition, and beyond.
                </p>
                {/* <p className="text-[14px] mt-2">Football Shoes</p>
                <p className="text-[14px] mt-2">Sports Shoes</p>
                <p className="text-[14px] mt-2">Casual Shoes</p> */}
              </div>
            </div>
            <div className="absolute right-[-25] bottom-[-18]">
              <Image src={jersey} alt="shoe1" width={150} className="" />
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="featured-products-section pt-[60px] pb-[50px] border-t border-b  border-brand">
        <div className="flex flex-col justify-center items-center gap-3">
        <p className="text-[14px]"><span className="text-brand">--</span> Our Products</p>
        <h4 className="text-[20px] font-semibold">Our <span className="text-brand">Products Collections</span></h4>
        </div>
        <div className="products-carosel pt-15 pb-5 pl-[20px] pr-[20px] flex gap-5 overflow-x-auto scrollbar-hide">
          {/* <div className="card">
            <a href="google.com">
            <div className="bg-[#E6E6E6] rounded-[20px] p-3 w-[200px]">
              <div className="label bg-brand w-fit pl-3 pt-1 pb-1 pr-3 rounded-[50px] text-[12px]">10% off</div>
              <div className="p-3">
              <Image src={jersey} alt="jersey"/>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-5 pb-5 pl-1">
              <p className="text-[#4C4C4C] text-[12px]">Jersey</p>
              <h4>White Jersey</h4>
              <p>₹599<span className="text-[#B1B1B1] ml-2 line-through">₹899</span></p>
            </div>
            </a>
          </div>
          <div className="card">
            <div className="bg-[#E6E6E6] rounded-[20px] p-3 w-[200px]">
              <div className="label bg-brand w-fit pl-3 pt-1 pb-1 pr-3 rounded-[50px] text-[12px]">10% off</div>
              <div className="p-3">
              <Image src={jersey} alt="jersey"/>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-5 pb-5 pl-1">
              <p className="text-[#4C4C4C] text-[12px]">Jersey</p>
              <h4>White Jersey</h4>
              <p>₹599<span className="text-[#B1B1B1] ml-2 line-through">₹899</span></p>
            </div>
          </div>
          <div className="card">
            <div className="bg-[#E6E6E6] rounded-[20px] p-3 w-[200px]">
              <div className="label bg-brand w-fit pl-3 pt-1 pb-1 pr-3 rounded-[50px] text-[12px]">10% off</div>
              <div className="p-3">
              <Image src={jersey} alt="jersey"/>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-5 pb-5 pl-1">
              <p className="text-[#4C4C4C] text-[12px]">Jersey</p>
              <h4>White Jersey</h4>
              <p>₹599<span className="text-[#B1B1B1] ml-2 line-through">₹899</span></p>
            </div>
          </div> */}
          <Card
  href="/product/1"
  image={jersey}
  category="Jersey"
  title="White Jersey"
  price={599}
  originalPrice={899}
  discount="10% off"
/>
  <Card
  href="/product/1"
  image={jersey}
  category="Jersey"
  title="White Jersey"
  price={599}
  originalPrice={899}
  discount="10% off"
/>
        </div>
      </div>
    </div>
  );
}
