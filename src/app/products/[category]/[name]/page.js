import Product from "@/app/models/Products";
import connectDB from "@/app/lib/mongodb";
import ProductDetails from "@/app/components/ProductDetails";
import ProductSchema from "@/app/components/ProductSchema";
import BreadcrumbSchema from "@/app/components/BreadcrumbSchema";
import Link from "next/link";

const resolveOgImage = (imageUrl) => {
    const fallback = `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`;
    if (!imageUrl) return fallback;
    if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
    if (imageUrl.startsWith("//")) return `https:${imageUrl}`;
    return `${process.env.NEXT_PUBLIC_SITE_URL}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
};

export async function generateMetadata({ params }) {
    await connectDB();

    const { category, name } = await params;

    const title = decodeURIComponent(name).replace(/-/g, " ").toUpperCase();
    const product = await Product.findOne({
        title: title,
    }).lean();

    if (!product) {
        return {
            title: "Product Not Found | Kickxwear",
        };
    }

    const image = resolveOgImage(
        product.variants?.[0]?.images?.[0]?.url,
    );

    const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/products/${category}/${name}`;

    return {
        title: `Sega ${product.title}  ${product.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} for Men | Buy Online | Kickxwear`,

        description: product.description?.text,

        alternates: {
            canonical: pageUrl,
        },

        openGraph: {
            title: `Sega {product.title} | ${product.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`,
            description: product.description?.text,
            url: pageUrl,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${category}/${name}/opengraph-image`,
                    alt: product.title,
                },
            ],
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: `Sega {product.title} | ${product.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`,
            description: product.description?.text,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${category}/${name}/opengraph-image`,
                    alt: product.title,
                },
            ],
        },
    };
}

export default async function ProductPage({ params }) {
    await connectDB();

    const { name } = await params;
    const title = decodeURIComponent(name).replace(/-/g, " ").toUpperCase();
    const product = await Product.findOne({
        title: title,
    }).lean();

    if (!product) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-6">
                <div className="max-w-xl text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#99ef12]/15">
                        <span className="text-4xl">👟</span>
                    </div>

                    <h1 className="text-4xl font-bold text-black">
                        Product Not Found
                    </h1>

                    <p className="mt-4 text-gray-600 leading-7">
                        The product you&apos;re looking for doesn&apos;t exist, may have been
                        removed, or the link is incorrect.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/products"
                            className="rounded-xl bg-[#99ef12] px-6 py-3 font-semibold text-black transition hover:scale-[1.02]"
                        >
                            Browse Products
                        </Link>

                        <Link
                            href="/"
                            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-black transition hover:bg-gray-100"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    const allImages = (product.variants || []).flatMap((v) => (v.images || []).map((i) => i.url));
    const mainImage = allImages.length ? allImages[0] : null;

    return (
        <>
            <ProductSchema product={product} />
            <BreadcrumbSchema
                category={product.category}
                title={product.title}
                slug={product.title}
            />
            <ProductDetails
                product={JSON.parse(
                    JSON.stringify(product)
                )}
            />
        </>
    );
}