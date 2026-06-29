import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: "Privacy Policy",
    description: "Read Kickxwear's privacy policy for catalog browsing, WhatsApp communication, order processing, and data protection.",
    keywords: [
        "Kickxwear",
        "Privacy Policy",
        "Data Protection",
        "WhatsApp Ordering",
        "User Privacy",
        "Personal Data",
    ],
    alternates: {
        canonical: "/privacy",
    },
    openGraph: {
        title: "Privacy Policy | Kickxwear",
        description: "Read Kickxwear's privacy policy for catalog browsing, WhatsApp communication, order processing, and data protection.",
        url: "/privacy",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Kickxwear Privacy Policy",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Privacy Policy | Kickxwear",
        description: "Read Kickxwear's privacy policy for catalog browsing, WhatsApp communication, order processing, and data protection.",
        images: ["/og-image.jpg"],
    },
};

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-brand selection:text-black">
      {/* Container: Max-width keeps lines from getting too long to read comfortably */}
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        
        {/* --- HEADER --- */}
        <header className="mb-16 border-b border-gray-100 pb-8">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-black mb-3">
            Privacy Policy
          </h1>
          <p className="text-[12px] text-gray-400 uppercase tracking-[0.2em] font-semibold">
            Last Updated: June 2026
          </p>
        </header>

        {/* --- CONTENT --- */}
        <div className="space-y-12 text-[15px] leading-relaxed text-gray-600">
          
          <section>
            <p>
              Welcome to <span className="font-medium text-black">Kickxwear</span>. Your privacy is critically important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and interact with us, place orders, or send queries via WhatsApp.
            </p>
            <p className="mt-4">
              By using our Site or communicating with us via WhatsApp, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">1. Information We Collect</h3>
            <p className="mb-4">Because we do not require you to create an account or log in to browse our catalog, we minimize the data we collect. We only collect information that you voluntarily provide to us when placing an order or making an inquiry.</p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong className="text-black font-medium">Communication Data:</strong> When you click our WhatsApp communication links, we receive your phone number and any information you choose to include in your message (such as your name, product queries, or screenshots).</li>
              <li><strong className="text-black font-medium">Order & Delivery Data:</strong> To fulfill an order placed via WhatsApp, we will request and collect your Full Name, Shipping Address, Billing Address, Alternate Contact Number, and Payment Confirmation details (such as UPI/Bank Transfer transaction IDs).</li>
              <li><strong className="text-black font-medium">Device & Usage Data:</strong> Like most websites, our Site may automatically collect non-identifiable information, such as your IP address, browser type, operating system, and pages viewed, to help us optimize performance.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">2. How We Use Your Information</h3>
            <p className="mb-4">We use the information we collect solely to provide a premium, personalized shopping experience, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Processing, fulfilling, and shipping orders placed over WhatsApp.</li>
              <li>Responding to your product inquiries, size queries, and customer service requests.</li>
              <li>Sending tracking details and delivery updates via WhatsApp or SMS.</li>
              <li>Preventing fraudulent transactions and ensuring secure direct payments.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">3. Data Sharing and Disclosure</h3>
            <p className="mb-4">We do not sell, trade, or rent your personal information to third parties. We only share data with trusted service providers necessary to execute your order:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-black font-medium">Courier & Logistics Partners:</strong> Your name, address, and phone number are shared with our delivery partners to transport and deliver your packages securely.</li>
              <li><strong className="text-black font-medium">Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">4. Data Security</h3>
            <p>
              We implement robust organizational and technical security measures to protect your personal data. Please note that while our website is highly secure, your WhatsApp communications are subject to WhatsApp’s own end-to-end encryption and privacy policies. We recommend never sharing highly sensitive financial credentials (like credit card PINs or passwords) over chat; we only require standard transaction references to verify payments.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">5. Your Rights</h3>
            <p>
              Depending on your location, you have the right to access, correct, or request the deletion of the personal information we hold about you (such as deleting your chat history and shipping address from our order records). To exercise these rights, simply message us directly on WhatsApp.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">6. Changes to This Policy</h3>
            <p>
              We reserve the right to update this Privacy Policy at any time. Any updates will be posted on this page with an updated revision date.
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

export default Privacy;