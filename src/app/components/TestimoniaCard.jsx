import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function TestimonialCard({
  icon,
  text,
  name,
}) {
  return (
    
    <div className="testimonial-card w-[250px] h-[150px] flex flex-col gap-3 border border-gray-200 bg-white p-5 rounded-[30px]">
      <div>
        <Image
          src={icon}
          alt="testimonial"
          width={32}
        />
      </div>

      <p className="text-[12px]">{text}</p>

      <p className="text-[12px] text-gray-600">
        {name}
      </p>
    </div>
  );
}