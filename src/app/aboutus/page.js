import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import lifestyle from "../../assests/icons/lifestyle.jpg"

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-brand selection:text-black pb-24">
      
      {/* --- HERO SECTION --- */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <p className="text-[12px] text-gray-400 uppercase tracking-[0.3em] font-semibold mb-6">
            The Kickxwear Story
          </p>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-black leading-[1.1] mb-8">
            Performance gear for the <span className="text-gray-400 italic">dedicated</span> athlete.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
            Based in India, we curate the highest tier of football boots, running shoes, and athletic apparel. No compromises, just elite equipment.
          </p>
        </div>
      </div>

      {/* --- EDITORIAL SPLIT LAYOUT --- */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Left: Brand Story Text */}
          <div className="order-2 md:order-1 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-black mb-6">
              More than a store. <br /> A direct connection.
            </h2>
            <div className="space-y-6 text-[15px] leading-relaxed text-gray-600">
              <p>
                In an era of automated bots and faceless checkouts, we decided to do things differently. Kickxwear was built on the belief that buying premium sports gear should be a personalized, concierge-level experience.
              </p>
              <p>
                That is why we operate entirely through direct, human-to-human communication. When you find the perfect pair of pitch-ready football studs or street-ready casuals, you don&apos;t just click a button—you talk to us. We verify sizes, confirm stock, and ensure you get exactly what you need to elevate your game.
              </p>
              <p>
                From the local pitches of Kanpur to marathon runners across the country, our mission is simple: equip you with greatness.
              </p>
            </div>

            {/* Signature / Detail */}
            <div className="mt-10 border-l-2 border-brand pl-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-black">
                Est. 2024
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Kanpur, Uttar Pradesh
              </p>
            </div>
          </div>

          {/* Right: Abstract/Brand Image */}
          {/* Note: Update src to a cool lifestyle image of someone tying their boots, or a locker room aesthetic */}
          <div className="order-1 md:order-2 relative h-[500px] md:h-[700px] w-full rounded-[24px] overflow-hidden bg-[#F5F5F5]">
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              {/* Replace this div with your actual Image component */}
              {/* <p className="text-sm uppercase tracking-widest">[ Insert Premium Lifestyle Image Here ]</p> */}
              <Image src={lifestyle} alt="Kickxwear Athlete" fill className="object-cover hover:scale-105 transition-transform duration-[2s]" />
            </div>
          </div>

        </div>
      </div>

      {/* --- OUR VALUES GRID --- */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-24 border-t border-gray-100 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Value 1 */}
          <div className="flex flex-col group">
            <span className="text-brand text-4xl mb-6 transition-transform duration-500 group-hover:-translate-y-2">✦</span>
            <h3 className="text-xl font-medium text-black mb-3">Curated Excellence</h3>
            <p className="text-[15px] text-gray-500 leading-relaxed max-w-[90%]">
              We don&apos;t sell everything. We only stock gear that meets strict performance, durability, and stylistic standards.
            </p>
          </div>

          {/* Value 2 */}
          <div className="flex flex-col group">
            <span className="text-brand text-4xl mb-6 transition-transform duration-500 group-hover:-translate-y-2">✦</span>
            <h3 className="text-xl font-medium text-black mb-3">Direct Support</h3>
            <p className="text-[15px] text-gray-500 leading-relaxed max-w-[90%]">
              Every WhatsApp chat is answered by a real person who understands the gear, the fit, and the sport.
            </p>
          </div>

          {/* Value 3 */}
          <div className="flex flex-col group">
            <span className="text-brand text-4xl mb-6 transition-transform duration-500 group-hover:-translate-y-2">✦</span>
            <h3 className="text-xl font-medium text-black mb-3">Authentic Gear</h3>
            <p className="text-[15px] text-gray-500 leading-relaxed max-w-[90%]">
              From flagship running shoes to official apparel, we guarantee the authenticity and quality of every item we ship.
            </p>
          </div>

        </div>
      </div>

      {/* --- BOTTOM CTA --- */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="bg-[#0a0a0a] rounded-[24px] p-12 md:p-20 text-center flex flex-col items-center relative overflow-hidden">
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6">
              Ready to elevate your game?
            </h2>
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-full text-[14px] font-medium hover:scale-105 transition-transform duration-300"
            >
              Explore The Catalog
            </Link>
          </div>

          {/* Abstract background element for luxury feel */}
          <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[200%] bg-white/5 blur-[100px] rounded-full pointer-events-none transform -rotate-45"></div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;