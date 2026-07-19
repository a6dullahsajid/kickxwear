export default function ProductSchema({ product }) {
  const firstVariant = product.variants?.[0];
  const validFrom = new Date().toISOString();

  const images =
    product.variants?.flatMap((variant) =>
      variant.images.map((image) => image.url),
    ) || [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.title,

    image: images,

    description: product.description?.text,

    sku: product.sku,

    brand: {
      "@type": "Brand",
      name: "Kickxwear",
    },

    category: product.category,

    offers: {
      "@type": "Offer",

      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.category}/${product.slug}`,

      priceCurrency: "INR",

      price: product.SP,

      priceValidUntil: "2027-12-31",

      validFrom,

      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          currency: "INR",
          value: 0,
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
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
      },

      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        name: "Kickxwear return policy",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/return`,
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 1,
        returnFees: {
          "@type": "MonetaryAmount",
          currency: "INR",
          value: 79,
        },
        returnMethod: "ReturnByMail",
        applicableCountry: "IN",
      },

      availability: firstVariant?.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",

      itemCondition: "https://schema.org/NewCondition",

      seller: {
        "@type": "Organization",
        name: "Kickxwear",
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
