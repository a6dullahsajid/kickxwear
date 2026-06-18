"use client";

import kickxwear_logo from "../../assests/icons/kickxwear_logo.png";
import Image from "next/image";
import instagram_icon from "../../assests/icons/instagram_icon.png";
import whatsapp_icon from "../../assests/icons/whatsapp_icon.png";
import facebook_icon from "../../assests/icons/facebook_icon.png";
import { Bungee_Shade } from "next/font/google";

const bungee = Bungee_Shade({
  subsets: ["latin"],
  weight: "400",
});

export default function Footer() {
  return (
    <>
      <div className="footer-top pt-15 pb-15 pl-10 pr-10 flex flex-col md:flex-row md:justify-around gap-10 bg-white text-black border-t border-brand">
        <div className="brand flex flex-col gap-3">
          <div className="flex items-center font-semibold">
            <Image src={kickxwear_logo} alt="kickxwear logo" />
            <p className="text-3xl md:text-2xl lg:text-3xl">
              kick<span className="text-brand">x</span>wear
            </p>
          </div>
          <p className="max-w-90">
            Whether you&apos;re looking for premium shoes, stylish jerseys, or
            must-have sports accessories, we&apos;ve got you covered.
          </p>
          <div className="social w-25 flex justify-between items-center mt-2">
            <a href="#">
              <Image
                src={instagram_icon}
                alt="instagram icon"
                width={18}
                height={18}
                className="transition-transform duration-300 hover:scale-125"
              />
            </a>
            <a href="#">
              <Image
                src={whatsapp_icon}
                alt="whatsapp icon"
                width={18}
                height={18}
                className="transition-transform duration-300 hover:scale-125"
              />
            </a>
            <a href="#">
              <Image
                src={facebook_icon}
                alt="facebook icon"
                width={18}
                height={18}
                className="transition-transform duration-300 hover:scale-125"
              />
            </a>
          </div>
        </div>
        <div className="company">
          <p className="font-bold">Company</p>
          <ul className="mt-2 text-[14px] flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black">
              <a href="#">About Us</a>
            </li>
            <li className="hover:text-black">
              <a href="#">Contact Us</a>
            </li>
            <li className="hover:text-black">
              <a href="#">Follow Us</a>
            </li>
          </ul>
        </div>
        <div className="customer-service">
          <p className="font-bold">Customer Service</p>
          <ul className="mt-2 text-[14px] flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black">
              <a href="#">Explore Products</a>
            </li>
            <li className="hover:text-black">
              <a href="#">Send Query</a>
            </li>
            <li className="hover:text-black">
              <a href="#">FAQs</a>
            </li>
          </ul>
        </div>
        <div className="our-info">
          <p className="font-bold">Our Information</p>
          <ul className="mt-2 text-[14px] flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black">
              <a href="#">Privacy</a>
            </li>
            <li className="hover:text-black">
              <a href="#">User Terms & Condition</a>
            </li>
            <li className="hover:text-black">
              <a href="#">Return Policy</a>
            </li>
          </ul>
        </div>
        <div className="contact-info">
          <p className="font-bold">Contact Info</p>
          <ul className="mt-2 text-[14px] flex flex-col gap-2 text-gray-600">
            <li>+91 48516592</li>
            <li>example@gmail.com</li>
            <li>Kanpur, India</li>
          </ul>
        </div>
      </div>
      <div className="footer-middle h-11 bg-black pl-8 pr-8 pt-12 pb-12 text-[12px] flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 sm:pt-0 sm:pb-0">
        <p className="text-brand">
          Copyright © 2026 kickxwear. All Rights Reserved.
        </p>
        <p className="text-white">Designed by Ali Arshad Khan</p>
      </div>
      <div className="footer-bottom flex justify-center items-center pt-4 pb-4 md:pt-10 md:pb-10 pl-2 pr-2 bg-white text-black">
        <h1
          className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl ${bungee.className}`}
        >
          kick<span className="text-brand">x</span>wear
        </h1>
      </div>
    </>
  );
}
