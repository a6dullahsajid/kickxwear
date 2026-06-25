export default function BreadcrumbSchema({
    category,
    title,
    slug,
}) {
    const BASE_URL =
        process.env.NEXT_PUBLIC_SITE_URL;

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",

        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: BASE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: `${BASE_URL}/products`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: category
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) =>
                        c.toUpperCase()
                    ),
                item: `${BASE_URL}/products/${category}`,
            },
            {
                "@type": "ListItem",
                position: 4,
                name: title,
                item: `${BASE_URL}/products/${category}/${slug}`,
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema),
            }}
        />
    );
}