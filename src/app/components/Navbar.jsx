"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import instagram_icon from "../../assests/icons/instagram_icon.png";
import whatsapp_icon from "../../assests/icons/whatsapp_icon.png";
import facebook_icon from "../../assests/icons/facebook_icon.png";
import right_arrow from "../../assests/icons/right-arrow.png";
import kickxwear_logo from "../../assests/icons/kickxwear_logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <div className="header">
      <div className="banner bg-black h-11 text-brand flex justify-center md:justify-between items-center pl-8 pr-8 text-[12px]">
        <p className="contact hidden md:block">Contact Us : +91 789-655-8485</p>
        <div className="announcement flex justify-center items-center">
          <p className="announcement-text hover:underline">
            <a href="#">Get 20% off or any announcement</a>
          </p>
          <Image src={right_arrow} alt="right icon" width={16} height={16} />
        </div>
        <div className="social hidden w-25 md:flex justify-between items-center">
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

      <div className="relative bg-white h-16 border-brand border-b flex items-center justify-between pl-8 pr-8">
        <div className="nav-left">
          <Image
            src={kickxwear_logo}
            alt="kickxwear logo"
            width={60}
            height={40}
          />
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
              <a href="#">Home</a>
            </li>
            <li className="hover:underline">
              <a href="#">Products</a>
            </li>

            <li className="relative group">
              <button className="hover:underline cursor-pointer">
                Categories
              </button>

              <div className="absolute left-0 top-5 w-32 bg-white opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 pt-2 pb-2">
                <ul className="flex flex-col gap-2 text-[12px] text-gray-600 p-3">
                  <li className="hover:text-black cursor-pointer hover:underline">
                    Shoes
                  </li>
                  <li className="hover:text-black cursor-pointer hover:underline">
                    Jersey
                  </li>
                  <li className="hover:text-black cursor-pointer hover:underline">
                    Sport Accessories
                  </li>
                </ul>
              </div>
            </li>

            <li className="hover:underline">
              <a href="#">About Us</a>
            </li>
            <li className="hover:underline">
              <a href="#">FAQs</a>
            </li>
            <a href="#">
              <button className="contact-us bg-black text-white pl-4 pr-4 pt-1.5 pb-1.5 rounded-md transition-transform duration-300 hover:scale-105 cursor-pointer">
                Contact Us
              </button>
            </a>
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
                <a href="#">Home</a>
              </li>
              <li className="hover:underline">
                <a href="#">Products</a>
              </li>
              <li className="w-full flex flex-col">
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="hover:underline flex items-center gap-6 cursor-pointer"
                >
                  Categories
                  <span>{categoryOpen ? "⌄" : ">"}</span>
                </button>

                {categoryOpen && (
                  <ul
                    className={`mt-3 pl-4 flex flex-col justify-center gap-3 text-sm text-gray-600 overflow-hidden transition-all duration-300 ${
                      categoryOpen ? "max-h-40 mt-3" : "max-h-0"
                    }`}
                  >
                    <li className="hover:text-black">
                      <a href="#">Shoes</a>
                    </li>
                    <li className="hover:text-black">
                      <a href="#">Jerseys</a>
                    </li>
                    <li className="hover:text-black">
                      <a href="#">Sport Accessories</a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="hover:underline">
                <a href="#">About Us</a>
              </li>
              <li className="hover:underline">
                <a href="#">FAQs</a>
              </li>
              <a href="#">
                <button className="contact-us bg-black text-white pl-4 pr-4 pt-1.5 pb-1.5 rounded-md transition-transform duration-300 hover:scale-105 cursor-pointer">
                  Contact Us
                </button>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
