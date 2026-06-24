import Product from "@/app/models/Products";
import connectDB from "@/app/lib/mongodb";
import ProductDetails from "@/app/components/ProductDetails";

export default async function ProductPage({ params }) {
    await connectDB();

    const { id } = await params;

    const product = await Product.findById(id)
        .lean();

    if (!product) {
        return (
            <div>Product not found</div>
        );
    }
    const allImages = (product.variants || []).flatMap((v) => (v.images || []).map((i) => i.url));
    const mainImage = allImages.length ? allImages[0] : null;

    return (
        // app/products/[category]/[id]/page.js
        <ProductDetails
            product={JSON.parse(
                JSON.stringify(product)
            )}
        />
    );
}