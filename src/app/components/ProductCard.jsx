import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import ProductButton from "./ProductButton";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});
export default function ProductCard({
  product_id,
  image,
  category,
  title,
  price,
  originalPrice,
  outOfStock,
}) {
  return (
    <div className="card overflow-hidden rounded-2xl border border-brand bg-white">
      <div className="bg-white rounded-[20px] p-3 w-[200px] md:w-[250px] h-[180px] md:h-[200px] relative flex items-center justify-center">
        {outOfStock && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-[12px] z-10">
            Out of Stock
          </div>
        )}

        <div className="w-full h-full flex items-center justify-center  border-b border-bg-lightgrey">
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 pt-5 pb-5 pl-4">
        <p className={`text-[#4C4C4C] text-[12px] ${jakarta.className}`}>
          {category?.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
        </p>
        <h4 className={`font-semibold`}>
          {title?.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
        </h4>
        <p className={` ${jakarta.className}`}>
          ₹{price}
          {originalPrice && (
            <span className="text-[#B1B1B1] text-sm ml-2 line-through">
              ₹{originalPrice}
            </span>
          )}
        </p>
      </div>
      <ProductButton category={category} product_id={product_id} />
    </div>
  );
}
