import React from 'react';
import Link from 'next/link';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-brand selection:text-black">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        
        {/* --- HEADER --- */}
        <header className="mb-16 border-b border-gray-100 pb-8">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-black mb-3">
            Terms and Conditions
          </h1>
          <p className="text-[12px] text-gray-400 uppercase tracking-[0.2em] font-semibold">
            Last Updated: June 2026
          </p>
        </header>

        {/* --- CONTENT --- */}
        <div className="space-y-12 text-[15px] leading-relaxed text-gray-600">
          
          <section>
            <p>
              Welcome to <span className="font-medium text-black">Kickxwear</span>. These Terms and Conditions Terms govern your use of our catalog website and our manual ordering services provided via WhatsApp. 
            </p>
            <p className="mt-4">
              By accessing our website or placing an order through WhatsApp, you accept and agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">1. Catalog Accuracy and Pricing</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Our website serves as a digital showcase of our collections. While we strive for absolute accuracy, occasional typographical errors, inaccuracies, or omissions regarding product descriptions, pricing, stock availability, and promotional offers may occur.</li>
              <li>We reserve the right to correct any errors, change prices, or update availability at any time without prior notice.</li>
              <li>An item showing on the catalog does not guarantee stock availability. Stock availability is verified in real-time during your WhatsApp chat consultation.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">2. Ordering Process via WhatsApp</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong className="text-black font-medium">No Registration Needed:</strong> You do not need an account to browse or buy.</li>
              <li><strong className="text-black font-medium">Order Placement:</strong> Orders are formalized exclusively over our official WhatsApp business channel. A representative will confirm your selected items, sizing, total price, and shipping details.</li>
              <li><strong className="text-black font-medium">Contract of Sale:</strong> A binding contract of sale is only formed once we verify your direct payment (via UPI, Bank Transfer, or agreed Cash on Delivery) and issue an order confirmation message over WhatsApp.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">3. Payments</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>We accept direct payments through trusted UPI networks, secure bank transfers, or Cash on Delivery (COD) where available.</li>
              <li>For prepaid orders, proof of payment (such as a transaction ID or screenshot) must be shared within the WhatsApp chat thread before processing begins. We reserve the right to cancel any pending request if payment verification fails.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">4. Shipping & Delivery</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>We ship to addresses provided voluntarily by the user during the chat checkout process. Please double-check your shipping information; we are not liable for delayed or lost shipments due to incorrect addresses.</li>
              <li>Estimated delivery timelines will be provided upon order confirmation. While we partner with premium courier services to ensure rapid delivery, timelines are estimates and subject to transit delays beyond our control.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">5. Intellectual Property</h3>
            <p>
              All content present on our website—including logos, images, graphics, product photography, UI designs, and text—is the exclusive property of Kickxwear. Unauthorized reproduction, modification, distribution, or commercial use of any asset on this Site is strictly prohibited.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">6. Limitation of Liability</h3>
            <p>
              Kickxwear shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our website, communication channels, or products purchased through our services. Our maximum liability to you for any product purchased shall not exceed the actual purchase price paid for the item.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">7. Governing Law</h3>
            <p>
              These Terms are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in Kanpur, Uttar Pradesh.
            </p>
          </section>

        </div>

        {/* --- FOOTER / BACK LINK --- */}
        <div className="mt-20 pt-8 border-t border-gray-100">
          <Link 
            href="/#hero" 
            className="text-[13px] font-medium text-black uppercase tracking-widest hover:text-brand transition-colors duration-300 flex items-center gap-2 w-fit"
          >
            <span className="text-lg leading-none mb-[2px]">←</span> Return to Store
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Terms;