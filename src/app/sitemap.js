import Product from "@/app/models/Products";
import connectDB from "@/app/lib/mongodb";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export default async function sitemap() {
    await connectDB();

    const products = await Product.find({})
        .select("slug category updatedAt")
        .lean();

    const staticPages = [
        {
            url: `${BASE_URL}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/products`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.95,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];

    const categories = [
        "football-studs",
        "running-shoes",
        "casual-shoes",
        "jerseys",
        "accessories",
    ];

    const categoryPages = categories.map((category) => ({
        url: `${BASE_URL}/products/${category}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
    }));

    const productPages = products.map((product) => ({
        url: `${BASE_URL}/products/${product.category}/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [
        ...staticPages,
        ...categoryPages,
        ...productPages,
    ];
}