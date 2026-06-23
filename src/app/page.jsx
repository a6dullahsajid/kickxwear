import Image from "next/image";
import { Archivo_Black } from "next/font/google";
import shoe_1 from "../assests/icons/shoe1.png";
import shadow from "../assests/icons/shadow.png";
import shipping from "../assests/icons/shiping.png";
import payment from "../assests/icons/payment.png";
import support from "../assests/icons/support.png";
import jersey from "../assests/icons/jersey.png";
import testimonial from "../assests/icons/testimonial.png";
import Card from "./components/Card";
import reel_1 from "../assests/icons/reel_1.png";
import reel_2 from "../assests/icons/reel_2.png";
import reel_3 from "../assests/icons/reel_3.png";
import reel_4 from "../assests/icons/reel_4.png";
import reel_5 from "../assests/icons/reel_5.png";
import reel_6 from "../assests/icons/reel_6.png";
import instagram_icon from "../assests/icons/instagram_icon.png";
import HeroCarousel from "./components/HeroCarousel";
import TestimonialCarousel from "./components/TestimonialCarousel";
import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Products";

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
});

export default async function Home() {
  // 1. Connect to the database
  await connectDB();

  // 2. Fetch featured products directly from MongoDB
  const products = await Product.find({ isfeatured: true })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  const testimonials = [
    {
      id: 1,
      icon: testimonial,
      text: "Good running shoes for good price 👍 Thank you  🙏.",
      name: "Kishor Kumar",
    },
    {
      id: 2,
      icon: testimonial,
      text: "Quality is top notch, good cushioning, good bouncing.",
      name: "Jiyad P",
    },
    {
      id: 3,
      icon: testimonial,
      text: "I bought these shoes 3 days ago, and I have already completed 26 km of running in them.",
      name: "V Senthil Kumar",
    },
    {
      id: 4,
      icon: testimonial,
      text: "Ordered from Instagram and received exactly what I expected.",
      name: "Ahmed Khan",
    },
    {
      id: 5,
      icon: testimonial,
      text: "Excellent quality for the price.",
      name: "Sarthak",
    },
    {
      id: 6,
      icon: testimonial,
      text: "Fantastic shoes go for it if u buy it for running this is best out of all⭐⭐",
      name: "Dave Yaksh",
    },
    {
      id: 7,
      icon: testimonial,
      text: "Productive very helpful and shoes 1000 km running so best quality in best soul carbon blade 💪",
      name: "Saurabh Parkhe",
    },
    {
      id: 8,
      icon: testimonial,
      text: "It is better than the photos. Best according to the price. Also good for the long run.",
      name: "Bhaskar",
    },
    {
      id: 9,
      icon: testimonial,
      text: "Best for running. Good quality and material. Best brand for running 💨",
      name: "Ankit Aski",
    },
    {
      id: 10,
      icon: testimonial,
      text: "Stylish look and overall value for money.",
      name: "Jit Debsarma",
    },
  ];

  const reels = [
    {
      id: 51,
      reelLink:
        "https://www.instagram.com/reel/DZXwfp1v9Gk/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
      image: reel_1,
    },
    {
      id: 52,
      reelLink:
        "https://www.instagram.com/reel/DZabkwdpmyV/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
      image: reel_2,
    },
    {
      id: 53,
      reelLink:
        "https://www.instagram.com/reel/DZin5yxTb0s/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
      image: reel_3,
    },
    {
      id: 54,
      reelLink:
        "https://www.instagram.com/reel/DZnZdRxPxlX/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
      image: reel_4,
    },
    {
      id: 55,
      reelLink:
        "https://www.instagram.com/reel/DZpwo5Np8wO/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
      image: reel_5,
    },
    {
      id: 56,
      reelLink:
        "https://www.instagram.com/reel/DZsTgx_v-UR/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
      image: reel_6,
    },
  ];

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

        <div className="absolute top-28 md:top-30 w-ful h-full max-w-[300px] md:max-w-[550px] z-20">
          <HeroCarousel />
        </div>
        <div className="absolute w-full h-auto max-w-[1000px]">
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
          <Image src={shoe_1} alt="shoe1" width={300} />
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
                  <h3 className="text-[28px] font-semibold text-black">
                    Jersey
                  </h3>
                  <p className="text-[14px] text-gray-600 mt-2 max-w-[140px] md:max-w-[180px] lg:max-w-[200px]">
                    Authentic-inspired football jerseys from the world&apm;s
                    biggest clubs. Represent your team with pride, on match day
                    and every day.
                  </p>
                </div>
              </div>
              <div className="absolute right-[-25] bottom-[-18]">
                <Image src={jersey} alt="shoe1" width={150} />
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
                  <h3 className="text-[28px] font-semibold text-black">
                    Accessories
                  </h3>
                  <p className="text-[14px] text-gray-600 mt-2 max-w-[140px] md:max-w-[180px] lg:max-w-[200px]">
                    Premium sports accessories for athletes and champions. Built
                    for training, competition, and beyond.
                  </p>
                </div>
              </div>
              <div className="absolute right-[-25] bottom-[-18]">
                <Image src={jersey} alt="shoe1" width={150} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="featured-products-section pt-[60px] pb-[60px] border-t border-b  border-brand bg-bg-lightgrey">
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-[14px]">
            <span className="text-brand">--</span> Our Products
          </p>
          <h4 className="text-[20px] font-semibold">
            Our <span className="text-brand">Products Collections</span>
          </h4>
        </div>
        <div className="products-carosel flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-5 md:px-10 lg:px-15 pt-15">
          {products.map((product) => (
            <Card
              key={product._id}
              href="#"
              image={product.variants?.[0]?.images?.[0]?.url}
              category={product.category}
              title={product.title}
              price={product.SP}
              originalPrice={product.MRP}
              discount="10% off"
            />
          ))}

          <a
            href="#"
            className="flex justify-center items-center p-3 w-[150px] md:w-[250px] h-[250px] md:h-[300px] shrink-0 hover:underline"
          >
            View All →
          </a>
        </div>
      </div>
      <div className="testimonial-section pt-[60px] pb-[60px] border-t border-b  border-brand">
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-[14px]">
            <span className="text-brand">--</span> Testimonial
          </p>
          <h4 className="text-[20px] font-semibold">
            What <span className="text-brand">Our Customer Say</span>
          </h4>
        </div>
        <TestimonialCarousel testimonials={testimonials} />
      </div>
      <div className="folow-us pt-[60px] pb-[60px] border-t border-b  border-brand">
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-[14px]">
            <span className="text-brand">--</span> Follow Us
          </p>
          <h4 className="text-[20px] font-semibold">
            Follow Us On<span className="text-brand"> Instagram</span>
          </h4>
        </div>
        <div className="insta-carousel flex lg:justify-between gap-6 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-5 md:px-10 lg:px-15 pt-15 pb-5">
          {reels.map((reel) => (
            <a
              key={reel.id}
              href={reel.reelLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="reel-card group relative flex-shrink-0 w-[200px] h-[200px] bg-bg-lightgrey rounded-[30px] overflow-hidden">
                <Image
                  src={reel.image}
                  alt={`Reel ${reel.id}`}
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 backdrop-blur-none transition-all duration-300 group-hover:bg-black/20 group-hover:backdrop-blur-sm">
                  <Image
                    src={instagram_icon}
                    alt="Instagram"
                    width={32}
                    height={32}
                    className="opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="faq-section pt-[60px] pb-[60px] border-t border-b border-brand">
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-[14px]">
            <span className="text-brand">--</span> Faqs
          </p>
          <h4 className="text-[20px] font-semibold">
            Question? <span className="text-brand">Look Here.</span>
          </h4>
        </div>

        <div className="max-w-[900px] mx-auto px-5 md:px-10 mt-12 flex flex-col gap-4">
          <details className="group bg-bg-lightgrey rounded-[24px] p-5">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <h5 className="font-medium text-[15px] md:text-[16px]">
                How long does shipping take?
              </h5>

              <span className="text-brand text-xl transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>

            <p className="mt-4 text-[14px] text-gray-600 leading-6">
              Orders are typically delivered within 3–7 business days depending
              on your location.
            </p>
          </details>

          <details className="group bg-bg-lightgrey rounded-[24px] p-5">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <h5 className="font-medium text-[15px] md:text-[16px]">
                Do you offer Cash on Delivery?
              </h5>

              <span className="text-brand text-xl transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>

            <p className="mt-4 text-[14px] text-gray-600 leading-6">
              No, Cash on Delivery is not available as of now.
            </p>
          </details>

          <details className="group bg-bg-lightgrey rounded-[24px] p-5">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <h5 className="font-medium text-[15px] md:text-[16px]">
                Can I exchange my order?
              </h5>

              <span className="text-brand text-xl transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>

            <p className="mt-4 text-[14px] text-gray-600 leading-6">
              Yes, exchanges are accepted within the specified return window if
              the product is unused and in original condition.
            </p>
          </details>

          <details className="group bg-bg-lightgrey rounded-[24px] p-5">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <h5 className="font-medium text-[15px] md:text-[16px]">
                How can I contact support?
              </h5>

              <span className="text-brand text-xl transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>

            <p className="mt-4 text-[14px] text-gray-600 leading-6">
              You can reach us through Instagram or WhatsApp for quick support.
            </p>
          </details>
        </div>
      </div>
      <div className="cta-section pt-[70px] pb-[70px] px-10 border-t border-b  border-brand bg-bg-lightgrey">
        <div className="flex flex-col justify-center items-center gap-10">
          <p className="text-[14px]">
            <span className="text-brand">--</span> Buy Now
          </p>
          <div className="flex flex-col justify-center items-center gap-10 ">
            <div className="text-[18px] lg:text-[24px] lg: font-semibold text-center flex flex-col gap-4">
              <h4>Gear Up Like a Champion </h4>
              <h4>Play Hard, Drip Harder</h4>
            </div>
            <h5 className="text-center text-[14px]">
              Don&amp;t wait—message us on WhatsApp and get your favorite gear
              today.
            </h5>
          </div>
          <div className="cta-button flex flex-col gap-5 md:flex-row">
            <button className="bg-brand text-black border-[1px] text-[12px] rounded-full pt-[8px] pb-[8px] pl-[5px] pr-[5px] w-[300px] md:w-[200px] h-[45px] border-black ">
              Chat and Order On Whatsapp
            </button>
            <button className="bg-white text-black border-[1px] text-[12px] rounded-full pt-[8px] pb-[8px] pl-[5px] pr-[5px] w-[300px] md:w-[200px] h-[45px] border-black ">
              Explore Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
