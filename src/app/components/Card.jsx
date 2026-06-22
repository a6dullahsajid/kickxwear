// import Image from "next/image";

// export default function Card() {
//   return (
//     <div className="card">
//       <a href="google.com">
//         <div className="bg-[#E6E6E6] rounded-[20px] p-3 w-[200px]">
//           <div className="label bg-brand w-fit pl-3 pt-1 pb-1 pr-3 rounded-[50px] text-[12px]">
//             10% off
//           </div>
//           <div className="p-3">
//             <Image src={jersey} alt="jersey" />
//           </div>
//         </div>
//         <div className="flex flex-col gap-2 pt-5 pb-5 pl-1">
//           <p className="text-[#4C4C4C] text-[12px]">Jersey</p>
//           <h4>White Jersey</h4>
//           <p>
//             ₹599<span className="text-[#B1B1B1] ml-2 line-through">₹899</span>
//           </p>
//         </div>
//       </a>
//     </div>
//   );
// }


import Image from "next/image";

export default function Card({
  href,
  image,
  category,
  title,
  price,
  originalPrice,
  discount,
}) {
  return (
  <div className="card">
  <a href={href}>
    <div className="bg-white rounded-[20px] p-3 w-[200px] md:w-[250px] h-[250px] md:h-[300px] relative flex items-center justify-center">

      {discount && (
        <div className="absolute top-3 left-3 bg-brand w-fit px-3 py-1 rounded-full text-[12px] z-10">
          {discount}
        </div>
      )}

      <div className="w-full h-full flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

    </div>

    <div className="flex flex-col gap-2 pt-5 pb-5 pl-1">
      <p className="text-[#4C4C4C] text-[12px]">{category?.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}</p>
      <h4>{title?.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}</h4>
      <p>
        ₹{price}
        {originalPrice && (
          <span className="text-[#B1B1B1] ml-2 line-through">
            ₹{originalPrice}
          </span>
        )}
      </p>
    </div>
  </a>
</div>
  );
}
