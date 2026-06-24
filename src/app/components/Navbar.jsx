"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import instagram_icon from "../../assests/icons/instagram_icon.png";
import whatsapp_icon from "../../assests/icons/whatsapp_icon.png";
import facebook_icon from "../../assests/icons/facebook_icon.png";
import right_arrow from "../../assests/icons/right-arrow.png";
import kickxwear_logo from "../../assests/icons/kickxwear_logo.png";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <div className="header fixed z-50 w-full">
      <div className="banner bg-black h-12 text-brand flex justify-center md:justify-between items-center pl-8 pr-8 text-[12px]">
        <p className="contact hidden md:block">Contact Us : +91 9569603674</p>
        <div className="announcement flex justify-center items-center">
          <p className="announcement-text hover:underline">
            <a href="#">Get 20% off or any announcement</a>
          </p>
          <Image src={right_arrow} alt="right icon" width={16} height={16} />
        </div>
        <div className="social hidden w-25 md:flex justify-between items-center">
          <Link href="https://www.instagram.com/kickxwear.in/">
            <Image
              src={instagram_icon}
              alt="instagram icon"
              width={18}
              height={18}
              className="transition-transform duration-300 hover:scale-125"
            />
          </Link>
          <Link href="https://wa.me/918707697774">
            <Image
              src={whatsapp_icon}
              alt="whatsapp icon"
              width={18}
              height={18}
              className="transition-transform duration-300 hover:scale-125"
            />
          </Link>
          <Link href="https://www.facebook.com/share/1M6D3Umm1U/">
            <Image
              src={facebook_icon}
              alt="facebook icon"
              width={18}
              height={18}
              className="transition-transform duration-300 hover:scale-125"
            />
          </Link>
        </div>
      </div>

      <div className="w-full bg-white h-20 flex items-center justify-between pl-8 pr-8 text-black border-b border-gray-200">
        <div className="nav-left">
          <Link href="/">
            <Image
              src={kickxwear_logo}
              alt="kickxwear logo"
              width={80}
              height={80}
              className="w-18 h-auto"
            />
          </Link>
        </div>

        <button
          className="Hamburger text-2xl cursor-pointer md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className="desk nav-right hidden md:flex justify-center items-center text-[14px]">
          <ul className="flex items-center gap-8">
            <li className="hover:underline">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:underline">
              <Link href="/products">Products</Link>
            </li>

            <li className="relative group">
              <Link href="/#category">
                <button className="hover:underline cursor-pointer">
                  Categories
                </button>
              </Link>

              {/* <div className="absolute left-0 top-5 w-32 bg-white opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 pt-2 pb-2">
                <ul className="flex flex-col gap-2 text-[12px] text-gray-500 p-3">
                  <li className="hover:text-black cursor-pointer hover:underline">
                    <Link href="/products">Shoes</Link>
                  </li>
                  <li className="hover:text-black cursor-pointer hover:underline">
                    <Link href="/products/jersey">Jersey</Link>
                  </li>
                  <li className="hover:text-black cursor-pointer hover:underline">
                    <Link href="/products/accesories">Sport Accessories</Link>
                  </li>
                </ul>
              </div> */}
            </li>

            <li className="hover:underline">
              <Link href="#testimonial">Testimonial</Link>
            </li>
            <li className="hover:underline">
              <Link href="#faq">FAQs</Link>
            </li>
            <Link href="#cta">
              <button className="contact-us bg-black text-white pl-4 pr-4 pt-1.5 pb-1.5 rounded-md transition-transform duration-300 hover:scale-105 cursor-pointer">
                Buy Now
              </button>
            </Link>
          </ul>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`mobile-nav fixed top-0 right-0 h-screen w-72 bg-white z-50
        transform transition-transform duration-300 ease-in-out border-brand border-l-2
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-4">
            <button
              className="text-2xl cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            <ul className="mt-6 pl-5 flex flex-col gap-6 cursor-pointer justify-center ">
              <li className="hover:underline">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:underline">
                <Link href="/products" scroll={true}>Products</Link>
              </li>
              <li className="w-full flex flex-col">
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="hover:underline flex items-center gap-6 cursor-pointer"
                >
                  Categories
                  <span>{categoryOpen ? "⌄" : ">"}</span>
                </button>

                {/* {categoryOpen && (
                  <ul
                    className={`mt-3 pl-4 flex flex-col justify-center gap-3 text-sm text-gray-500 overflow-hidden transition-all duration-300 ${
                      categoryOpen ? "max-h-40 mt-3" : "max-h-0"
                    }`}
                  >
                    <li className="hover:text-black">
                      <Link href="/products">Shoes</Link>
                    </li>
                    <li className="hover:text-black">
                      <Link href="/products/jersey">Jerseys</Link>
                    </li>
                    <li className="hover:text-black">
                      <Link href="/product/accessories">Sport Accessories</Link>
                    </li>
                  </ul>
                )} */}
              </li>
              <li className="hover:underline">
                <Link href="#testimonial">Testimonial</Link>
              </li>
              <li className="hover:underline">
                <Link href="#">FAQs</Link>
              </li>
              <a href="cta">
                <button className="contact-us bg-black text-white pl-4 pr-4 pt-1.5 pb-1.5 rounded-md transition-transform duration-300 hover:scale-105 cursor-pointer">
                  Buy Now
                </button>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
