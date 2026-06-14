import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Products";

// GET all products
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find();

    return Response.json(products, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// Add a product
export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();
    console.log("Received product data:", data);

    const product = await Product.create(data);

    return Response.json(
      {
        message: "Product added successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to add product" },
      { status: 500 }
    );
  }
}