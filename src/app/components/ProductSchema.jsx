export default function ProductSchema({ product }) {
  const firstVariant = product.variants?.[0];
  const validFrom = new Date().toISOString();

  const images =
    product.variants?.flatMap((variant) =>
      (variant.images || []).map((image) => image.url),
    ) || [];

  const slug = product.title.trim().toLowerCase().replace(/\s+/g, "-");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.title,

    image: images,

    description: product.description?.text,

    sku: product.sku,

    brand: {
      "@type": "Brand",
      name: "Sega",
    },

    category: product.category,

    offers: {
      "@type": "Offer",

      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.category}/${slug}`,

      priceCurrency: "INR",

      price: product.SP,

      priceValidUntil: "2027-12-31",

      validFrom,

      availability: firstVariant?.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",

      itemCondition: "https://schema.org/NewCondition",

      seller: {
        "@type": "Organization",
        name: "Kickxwear",
      },

      shippingDetails: {
        "@type": "OfferShippingDetails",

        shippingRate: {
          "@type": "MonetaryAmount",
          currency: "INR",
          value: 0,
        },

        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },

        deliveryTime: {
          "@type": "ShippingDeliveryTime",

          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "d",
          },

          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "d",
          },
        },
      },

      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",

        name: "Kickxwear Return Policy",

        url: `${process.env.NEXT_PUBLIC_SITE_URL}/return`,

        applicableCountry: "IN",

        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",

        merchantReturnDays: 1,

        returnMethod: "https://schema.org/ReturnByMail",

        // Google Merchant expects an enum here.
        returnFees: "https://schema.org/ReturnShippingFees",

        // If you want to mention ₹79, put it on your return policy page.
      },
    },
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
