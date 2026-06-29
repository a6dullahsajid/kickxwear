import Filter from "../components/Filter";
import Product from "@/app/models/Products";
import connectDB from "@/app/lib/mongodb";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "@/app/components/ScrollReveal";

export const metadata = {
    title: "Products",

    description:
        "Browse Kickxwear's complete collection of football studs, running shoes, casual shoes, jerseys, and sports accessories.",

    keywords: [
        "Kickxwear",
        "Sports Shoes",
        "Football Studs",
        "Running Shoes",
        "Casual Shoes",
        "Sports Accessories",
        "Sports Jerseys",
    ],

    alternates: {
        canonical: "/products",
    },

    openGraph: {
        title: "Products | Kickxwear",

        description:
            "Browse Kickxwear's complete collection of sports footwear and accessories.",

        url: "/products",

        type: "website",

        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Kickxwear Products",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",

        title: "Products",

        description:
            "Browse Kickxwear's complete collection of sports footwear and accessories.",

        images: ["/og-image.jpg"],
    },
};

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

    return (
        <>
            <div className="p-2 pt-10 md:p-12 scroll-mt-28">
                <h1 className="text-2xl md:text-4xl font-bold text-black">
                    All Products
                </h1>

                <p className="mt-3 text-sm md:text-base max-w-2xl text-gray-600">
                    Explore our complete collection of football studs,
                    running shoes and sports essentials
                    engineered for performance, comfort and style.
                </p>
            </div>
            <Filter />
            <div className="flex flex-wrap mb-8 md:p-4 md:px-12">
                {products.map((product, index) => {
                    return <div key={index} className="card overflow-hidden w-1/2 md:w-fit border border-bg-lightgrey bg-white">
                        <ScrollReveal key={product._id} delay={index * 0.1}>
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
            </div >
        </>
    );
}