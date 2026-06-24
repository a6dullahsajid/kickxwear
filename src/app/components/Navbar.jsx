"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import instagram_icon from "../../assests/icons/instagram_icon.png";
import whatsapp_icon from "../../assests/icons/whatsapp_icon.png";
import facebook_icon from "../../assests/icons/facebook_icon.png";
import right_arrow from "../../assests/icons/right-arrow.png";
import kickxwear_logo from "../../assests/icons/kickxwear_logo.png";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. Detect scroll to hide the banner
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="header fixed z-50 w-full">
      <div
        className={`banner bg-black text-brand flex justify-between items-center pl-4 pr-4 md:pl-8 md:pr-8 text-[12px] transition-all duration-300 ${
          isScrolled ? "h-0 opacity-0 overflow-hidden" : "h-12 opacity-100"
        }`}
      >
        {/* Left: Contact Info */}
        <div className="w-1/4 hidden md:flex items-center">
          <p className="contact">Contact Us : +91 9569603674</p>
        </div>

        {/* Middle: Announcement Container */}
        <div className="flex-1 overflow-hidden relative flex items-center h-full mx-4">
          {/* Added md:w-full and md:justify-center to center it on desktop */}
          <div className="animate-marquee gap-2 cursor-pointer md:w-full md:justify-center">
            <Link
              href="/products"
              className="announcement-text hover:underline"
            >
              Get 10% off on MRP on your first order.
            </Link>
            <Image
              src={right_arrow}
              alt="right icon"
              width={16}
              height={16}
              className="object-contain"
            />
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="social hidden w-1/4 md:flex justify-end items-center gap-4">
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
          <Link href="/#hero">
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
              <Link href="/#hero">Home</Link>
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
            </li>

            <li className="hover:underline">
              <Link href="/aboutus">About Us</Link>
            </li>
            <li className="hover:underline">
              <Link href="/#faq">FAQs</Link>
            </li>
            <Link href="/#cta">
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

            {/* 2. Added onClick={() => setMenuOpen(false)} to all sidebar list items */}
            <ul className="mt-6 pl-5 flex flex-col gap-6 cursor-pointer justify-center ">
              <li
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                <Link href="/#hero">Home</Link>
              </li>
              <li
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                <Link href="/products" scroll={true}>
                  Products
                </Link>
              </li>
              <li
                className="w-full flex flex-col"
                onClick={() => setMenuOpen(false)}
              >
                <Link href="/#category">Categories</Link>
              </li>
              <li
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                <Link href="/aboutus">About Us</Link>
              </li>
              <li
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                <Link href="/#faq">FAQs</Link>
              </li>
              <Link href="/#cta" onClick={() => setMenuOpen(false)}>
                <button className="contact-us bg-black text-white pl-4 pr-4 pt-1.5 pb-1.5 rounded-md transition-transform duration-300 hover:scale-105 cursor-pointer">
                  Buy Now
                </button>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
