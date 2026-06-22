import Filter from "../components/Filter";
import Product from "@/app/models/Products";
import connectDB from "@/app/lib/mongodb";
import ProductCard from "../components/ProductCard";

export default async function ProductsPage({
    searchParams,
}) {
    await connectDB();
    const params = await searchParams;

    const query = {};

    const search = params.search;
    const category = params.category || "all";
    const featured = params.featured;
    const stock = params.stock;
    console.log("Search Params:", { search, category, featured, stock });

    if (search?.trim()) {
        query.title = {
            $regex: search.trim(),
            $options: "i",
        };
    }

    if (category !== "all") {
        query.category = category;
    }

    if (featured === "true") {
        query.isfeatured = true;
    }

    if (stock === "true") {
        query["variants.inStock"] = true;
    }

    const products = await Product.find(query)
        .sort({ createdAt: -1 })
        .lean();
    console.log("Products found:", products);

    return (
        <>
            <Filter />

            <div className="flex p-4 flex-wrap justify-center gap-8">
                {products.map((product) => {
                    return <ProductCard
                        key={product._id}
                        product_id={product._id.toString()}
                        image={product.variants[0].images[0].url}
                        category={product.category}
                        title={product.title}
                        price={product.SP}
                        originalPrice={product.MRP}
                        outOfStock={!product.variants.some((variant) => variant.inStock)}
                    />
                })}
            </div >
        </>
    );
}