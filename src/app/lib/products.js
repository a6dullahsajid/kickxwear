import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Products";

export async function getFeaturedProducts() {
  await connectDB();

  const products = await Product.find({ isfeatured: true })
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(products));
}