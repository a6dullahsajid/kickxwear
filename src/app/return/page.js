import React from 'react';
import Link from 'next/link';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-brand selection:text-black">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        
        {/* --- HEADER --- */}
        <header className="mb-16 border-b border-gray-100 pb-8">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-black mb-3">
            Return & Refund Policy
          </h1>
          <p className="text-[12px] text-gray-400 uppercase tracking-[0.2em] font-semibold">
            Last Updated: June 2026
          </p>
        </header>

        {/* --- CONTENT --- */}
        <div className="space-y-12 text-[15px] leading-relaxed text-gray-600">
          
          <section>
            <p>
              At <span className="font-medium text-black">Kickxwear</span>, we stand by the premium quality of our sports gear and footwear. If you are not entirely satisfied with your purchase, we are here to help you resolve it quickly through a direct, human-to-human process via WhatsApp.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">1. Eligibility Window</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong className="text-black font-medium">Returns:</strong> You can request a return within <strong className="text-black font-medium">7 days</strong> from the date your package was delivered.</li>
              <li><strong className="text-black font-medium">Exchanges:</strong> Size exchanges (subject to stock availability) can be requested within <strong className="text-black font-medium">7 days</strong> of delivery.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">2. Condition of Items</h3>
            <p className="mb-4">To qualify for a return or an exchange, your item must meet the following strict luxury-standard criteria:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li>The product must be completely unused, unwashed, and in the exact condition you received it.</li>
              <li>Shoes and boots must be tried on clean, indoor surfaces only and show absolutely zero signs of wear, creasing, or pitch grass stains.</li>
              <li>The item must be in its original packaging, including the original box, intact tags, wrapping, and any accompanying accessories or extra laces.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">3. How to Initiate a Return or Exchange</h3>
            <p className="mb-4">Since we do not use automated user dashboards, the return process is handled instantly over chat:</p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Take 2-3 clear photographs of the item showing its unused condition and original packaging.</li>
              <li>Send the photos along with your original order name or phone number to us on WhatsApp.</li>
              <li>Our support representative will review the images, verify eligibility, and provide you with step-by-step instructions.</li>
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">4. Reverse Pickup & Shipping Costs</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong className="text-black font-medium">Defective or Wrong Items:</strong> If we shipped an incorrect size, or if the item possesses a verified manufacturing defect, we will organize a free reverse pickup and bear all shipping costs.</li>
              <li><strong className="text-black font-medium">Standard Returns/Size Changes:</strong> For regular returns or exchanges due to personal preference or voluntary fit changes, the customer is responsible for return shipping costs. We can either schedule a reverse pickup and deduct the shipping fee from your final refund, or you can self-ship it back to our central warehouse.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-black mb-4 tracking-tight">5. Refunds Processing</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Once your return package arrives back at our facility, it undergoes a quick quality inspection.</li>
              <li>Upon approval, your refund will be processed immediately via <strong className="text-black font-medium">UPI or Direct Bank Transfer</strong> to an account specified by you securely inside our WhatsApp chat thread.</li>
              <li>Refunds typically reflect in your account within 2-4 business days post-approval. Please note that original shipping charges (if applicable) are non-refundable.</li>
            </ul>
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

export default ReturnPolicy;