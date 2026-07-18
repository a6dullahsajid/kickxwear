import Filter from "../../components/Filter";
import Product from "@/app/models/Products";
import connectDB from "@/app/lib/mongodb";
import ProductCard from "../../components/ProductCard";
import ScrollReveal from "@/app/components/ScrollReveal";
import { categorySEO } from "@/app/lib/categorySEO";
import Link from "next/link";

export async function generateMetadata({
    params,
}) {
    const { category } = await params;

    const seo =
        categorySEO[category] ?? {
            title: "Products",
            description:
                "Browse sports footwear from Kickxwear.",
        };

    return {
        title: `${seo.title}`,

        description: seo.description,

        alternates: {
            canonical: `/products/${category}`,
        },

        openGraph: {
            title: `${seo.title} | Kickxwear`,
            description: seo.description,
            url: `/products/${category}`,
            type: "website",

            images: [
                {
                    url: "/og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: seo.title,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: `${seo.title} | Kickxwear`,
            description: seo.description,
            images: ["/og-image.jpg"],
        },
    };
}

export default async function CategoryPage({
    params,
    searchParams,
}) {
    await connectDB();

    const { category } = await params;
    const filters = await searchParams;

    if (!categorySEO[category]) {
        const formattedCategory = category
            .split("-")
            .map((word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");

        return (
            <div className="p-2 pt-10 md:p-12 scroll-mt-28 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-black">
                    {formattedCategory} Collection Coming Soon
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-600">
                    We&apos;re preparing the {formattedCategory} range for launch. Check back soon or browse our current collections in the store.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/products"
                        className="rounded-xl bg-[#99ef12] px-6 py-3 text-black transition hover:opacity-90"
                    >
                        Browse All Products
                    </Link>
                </div>
            </div>
        );
    }

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
            {products.length === 0 &&
                <div className="p-2 pt-10 md:p-12 scroll-mt-28 text-center">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900/50">
                        {currentCategory.title} Collection Coming Soon
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-800/40">
                        We&apos;re preparing the {currentCategory.title} range for launch. Check back soon or browse our current collections in the store.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/products"
                            className="rounded-xl bg-[#99ef12] px-6 py-3 text-black transition hover:opacity-90"
                        >
                            Browse All Products
                        </Link>
                    </div>
                </div>
            }

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