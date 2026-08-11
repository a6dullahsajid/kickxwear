import { NextResponse } from "next/server";
import connectDB from "../lib/mongodb";
import Product from "../models/Products";

function generateSlug(title = "") {
    return title
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function escapeXml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export async function GET() {
    try {
        await connectDB();

        const products = await Product.find({}).lean();

        const items = [];

        for (const product of products) {
            const slug = generateSlug(product.title);

            const productUrl = `https://www.kickxwear.in/products/${encodeURIComponent(
                product.category
            )}/${slug}`;

            const description = escapeXml(
                product.description?.text || product.title
            );

            // Skip if no variants
            if (!product.variants?.length) continue;

            for (const variant of product.variants) {
                const mainImage = variant.images?.[0]?.url || "";

                const additionalImages = (variant.images || [])
                    .slice(1)
                    .map(
                        (img) =>
                            `<g:additional_image_link>${escapeXml(
                                img.url
                            )}</g:additional_image_link>`
                    )
                    .join("\n");

                // If no sizes, still create one item
                const sizes =
                    variant.sizes?.length > 0 ? variant.sizes : [null];

                for (const size of sizes) {
                    items.push(`
<item>

<g:id>${escapeXml(product.sku)}-${escapeXml(
                        variant.colorName
                    )}${size ? `-${size}` : ""}</g:id>

<title>${escapeXml(product.title)}</title>

<description>${description}</description>

<link>${productUrl}</link>

<g:image_link>${escapeXml(mainImage)}</g:image_link>

${additionalImages}

<g:availability>${variant.inStock ? "in_stock" : "out_of_stock"
                        }</g:availability>

<g:condition>new</g:condition>

<g:price>${Number(product.MRP).toFixed(2)} INR</g:price>

<g:sale_price>${Number(product.SP).toFixed(2)} INR</g:sale_price>

<g:brand>Kickxwear</g:brand>

<g:product_type>${escapeXml(product.category)}</g:product_type>

<g:google_product_category>187</g:google_product_category>

<g:identifier_exists>false</g:identifier_exists>

<g:color>${escapeXml(
                            variant.colorName
                        )}</g:color>

${size
                            ? `<g:size>${escapeXml(size)}</g:size>`
                            : ""
                        }

<g:gender>unisex</g:gender>

<g:age_group>adult</g:age_group>
<g:shipping>
    <g:country>IN</g:country>
    <g:service>Standard</g:service>
    <g:price>99.00 INR</g:price>
</g:shipping>

</item>
`);
                }
            }
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>

<rss
version="2.0"
xmlns:g="http://base.google.com/ns/1.0">

<channel>

<title>Kickxwear</title>

<link>https://www.kickxwear.in</link>

<description>Kickxwear Premium Footwear</description>

${items.join("\n")}

</channel>

</rss>`;

        return new NextResponse(xml, {
            headers: {
                "Content-Type": "application/xml; charset=utf-8",
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (error) {
        console.error(error);

        return new NextResponse("Failed to generate feed.", {
            status: 500,
        });
    }
}