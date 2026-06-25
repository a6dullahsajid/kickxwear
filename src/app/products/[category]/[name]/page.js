import Product from "@/app/models/Products";
import connectDB from "@/app/lib/mongodb";
import ProductDetails from "@/app/components/ProductDetails";
import ProductSchema from "@/app/components/ProductSchema";
import BreadcrumbSchema from "@/app/components/BreadcrumbSchema";

export async function generateMetadata({ params }) {
    await connectDB();

    const { category, name } = await params;

    const product = await Product.findOne({
        slug: name,
    }).lean();

    if (!product) {
        return {
            title: "Product Not Found | Kickxwear",
        };
    }

    const image =
        product.variants?.[0]?.images?.[0]?.url ??
        "/og-image.jpg";

    return {
        title: `${product.title} | Kickxwear`,

        description:
            product.description?.text?.slice(0, 155),

        alternates: {
            canonical: `/products/${category}/${name}`,
        },

        openGraph: {
            title: product.title,
            description: product.description?.text,
            url: `/products/${category}/${name}`,
            images: [image],
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: product.title,
            description: product.description?.text,
            images: [image],
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
            <div>Product not found</div>
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