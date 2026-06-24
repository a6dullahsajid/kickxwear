import Filter from "../../components/Filter";
import Product from "@/app/models/Products";
import connectDB from "@/app/lib/mongodb";
import ProductCard from "../../components/ProductCard";
import ScrollReveal from "@/app/components/ScrollReveal";

export default async function CategoryPage({
    params,
    searchParams,
}) {
    await connectDB();

    const { category } = await params;
    const filters = await searchParams;

    const query = {
        category,
    };

    if (filters.search?.trim()) {
        query.title = {
            $regex: filters.search.trim(),
            $options: "i",
        };
    }

    if (filters.featured === "true") {
        query.isfeatured = true;
    }

    if (filters.stock === "true") {
        query["variants.inStock"] = true;
    }

    const products = await Product.find(query)
        .sort({ createdAt: -1 })
        .lean();
    const categoryData = {
        "football-studs": {
            title: "Football Studs",
            description:
                "Dominate the pitch with football studs engineered for speed, grip, stability and explosive performance on every surface.",
        },

        "running-shoes": {
            title: "Running Shoes",
            description:
                "Lightweight and responsive running shoes designed for comfort, endurance and peak performance during every run.",
        },

        "casual-shoes": {
            title: "Casual Shoes",
            description:
                "Stylish everyday footwear that combines comfort, versatility and modern design for daily wear.",
        },

        "jersey": {
            title: "Sports Jerseys",
            description:
                "Premium quality jerseys crafted for athletes and fans who demand comfort, breathability and style.",
        },

        "accessories": {
            title: "Sports Accessories",
            description:
                "Complete your game with high-performance sports accessories designed to support every athlete.",
        },
    };

    const currentCategory =
        categoryData[category] || {
            title: category
                .split("-")
                .map(
                    (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" "),
            description:
                "Explore our collection of premium products.",
        };

    return (
        <>
            <div className="p-2 pt-10 md:p-12 scroll-mt-28">
                <h1 className="text-2xl md:text-4xl font-bold text-black">
                    {currentCategory.title}
                </h1>
                <p className="mt-3 max-w-2xl text-sm md:text-base text-gray-600">
                    {currentCategory.description}
                </p>
            </div>
            <Filter />

            <div className="flex flex-wrap mb-8 md:p-4 md:px-12">
                {products.map((product, index) => {
                    return <div key={index} className="card overflow-hidden w-1/2 md:w-fit border border-bg-lightgrey bg-white">
                        <ScrollReveal key={product._id} delay={index * 0.15}>
                            <ProductCard
                                product_id={product._id.toString()}
                                image={product.variants[0].images[0].url}
                                category={product.category}
                                title={product.title}
                                price={product.SP}
                                originalPrice={product.MRP}
                                outOfStock={!product.variants.some((variant) => variant.inStock)}
                            />
                        </ScrollReveal>
                    </div>
                })}
            </div>
        </>
    );
}