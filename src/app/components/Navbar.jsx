"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import instagram_icon from "../../assests/icons/instagram_icon.png";
import whatsapp_icon from "../../assests/icons/whatsapp_icon.png";
import facebook_icon from "../../assests/icons/facebook_icon.png";
import right_arrow from "../../assests/icons/right-arrow.png";
import kickxwear_logo from "../../assests/icons/kickxwear_logo.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  const router = useRouter();

  // 1. Detect scroll to hide the banner
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const checkCustomerSession = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });
        const data = await response.json();

        if (!cancelled && response.ok && data.success) {
          setCustomer(data.customer);
        } else if (!cancelled) {
          setCustomer(null);
        }
      } catch (error) {
        console.error("Unable to check customer session:", error);

        if (!cancelled) {
          setCustomer(null);
        }
      } finally {
        if (!cancelled) {
          setAuthLoading(false);
        }
      }
    };

    checkCustomerSession();

    return () => {
      cancelled = true;
    };
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

        <div className="desk nav-right hidden md:flex ml-42 justify-center items-center text-[14px]">
          <ul className="flex items-center gap-8">
            <li className="hover:underline underline-offset-2">
              <Link href="/#hero">Home</Link>
            </li>
            <li className="hover:underline underline-offset-2">
              <Link href="/products">Shop</Link>
            </li>

            <li className="relative group">
              <Link href="/#category">
                <button className="hover:underline text-black/65 font-semibold text-shadow-[0px_0px_0px_rgb(168,255,0)] underline-offset-2 cursor-pointer">
                  Collections
                </button>
              </Link>
            </li>

            {/* <li className="hover:underline underline-offset-2">
              <Link href="/aboutus">About Us</Link>
            </li> */}
            {/* <li className="hover:underline">
              <Link href="/#faq">FAQs</Link>
            </li> */}
            {/* <Link href="/#cta">
              <button className="contact-us bg-black text-white pl-4 pr-4 pt-1.5 pb-1.5 rounded-md transition-transform duration-300 hover:scale-105 cursor-pointer">
                Buy Now
              </button>
            </Link> */}
          </ul>
        </div>
        <div className="desk nav-right w-80 justify-end hidden md:flex">
          <ul className="flex items-center gap-5">
            
            <li className="group/search flex items-center">
              <form
                onSubmit={handleSearch}
                className="relative flex items-center"
              >
                <button
                  type="submit"
                  aria-label="Search products"
                  className="absolute left-3 z-10 text-gray-800/90"
                >
                  <FaSearch className="text" />
                </button>

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search..."
                  aria-label="Search products"
                  className="
        w-6 cursor-pointer rounded-full border border-transparent
        bg-transparent py-1 pl-8 pr-1 text-sm text-black
        outline-none transition-all duration-300 ease-in-out
        placeholder:text-transparent
        hover:border-gray-200
        focus:w-40 focus:cursor-text focus:border-gray-900
        focus:bg-gray-50 focus:placeholder:text-gray-500
        focus:ring-2 focus:ring-black/5
        md:group-hover/search:w-40
        md:group-hover/search:border-gray-900
        md:group-hover/search:bg-gray-100
        md:group-hover/search:placeholder:text-gray-500
        lg:focus:w-26 lg:group-hover/search:w-26
      "
                />
              </form>
            </li>
          
            <li className="relative">
              {authLoading ? null : customer ? (
                <div className="group relative">
                  <button
                    type="button"
                    aria-label="Open account menu"
                    className="flex items-center"
                  >
                    <FaRegUser className="cursor-pointer text-lg" />
                  </button>

                  <div className="invisible absolute right-0 top-full z-50 w-36 pt-2 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                    <ul className="flex flex-col gap-3 rounded-md border border-gray-200 bg-white p-3 text-sm text-black shadow-lg">
                      <li className="hover:underline">
                        <Link href="/account">My Account</Link>
                      </li>

                      <li>
                        <button
                          type="button"
                          className="hover:underline"
                          onClick={async () => {
                            try {
                              const response = await fetch("/api/auth/logout", {
                                method: "POST",
                              });

                              const data = await response.json();

                              if (!response.ok || !data.success) {
                                throw new Error(
                                  data.message || "Logout failed.",
                                );
                              }

                              setCustomer(null);
                              router.refresh();
                            } catch (error) {
                              console.error("Logout error:", error);
                            }
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="group relative">
                  <button
                    type="button"
                    aria-label="Open account menu"
                    className="flex items-center"
                  >
                    <FaRegUser className="cursor-pointer text-lg" />
                    <div className="invisible absolute -left-1/2 top-full z-50 w-fit pt-1 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                      <ul className="flex flex-col gap-3 rounded-md border border-gray-200 bg-white px-2 py-1 text-sm text-black shadow-lg">
                        <li className="hover:underline">
                          <Link href="/login">Login</Link>
                        </li>
                      </ul>
                    </div>
                  </button>
                </div>
              )}
            </li>
            <li>
              <IoBagOutline className="text-xl font-bold cursor-pointer" />
            </li>
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
                  Shop
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
              {/* <li
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                <Link href="/#faq">FAQs</Link>
              </li> */}
              {/* <Link href="/#cta" onClick={() => setMenuOpen(false)}>
                <button className="contact-us bg-black text-white pl-4 pr-4 pt-1.5 pb-1.5 rounded-md transition-transform duration-300 hover:scale-105 cursor-pointer">
                  Buy Now
                </button>
              </Link> */}
              <li
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                {authLoading ? null : customer ? (
                  <Link href="/account">
                    <FaRegUser />
                  </Link>
                ) : (
                  <Link href="/login">Login</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
