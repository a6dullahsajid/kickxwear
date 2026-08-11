export default function ProductSchema({ product }) {
  const firstVariant = product.variants?.[0];
  const validFrom = new Date().toISOString();

  const images =
    product.variants?.flatMap((variant) =>
      (variant.images || []).map((image) => image.url),
    ) || [];

  const slug = product.title
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.category}/${slug}`;

  const colors = product.variants
    ?.map((v) => v.colorName)
    .filter(Boolean)
    .join(", ");

  const sizes = [
    ...new Set(product.variants?.flatMap((v) => v.sizes || []) || []),
  ].join(", ");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.title,

    url: productUrl,

    image: images,

    description: product.description?.text,

    sku: product.sku.trim().toLowerCase().replace(/\s+/g, "-"),

    mpn: product.sku.trim().toLowerCase().replace(/\s+/g, "-"),

    brand: {
      "@type": "Brand",
      name: "SEGA",
    },

    category: product.category,

    ...(colors && { color: colors }),

    ...(sizes && { size: sizes }),

    offers: {
      "@type": "Offer",

      url: productUrl,

      priceCurrency: "INR",

      price: product.SP,

      priceValidUntil: "2027-12-31",

      validFrom,

      availability: firstVariant?.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",

      itemCondition: "https://schema.org/NewCondition",

      priceSpecification: {
        "@type": "PriceSpecification",
        price: product.SP,
        priceCurrency: "INR",
      },

      seller: {
        "@type": "Organization",
        name: "Kickxwear",
      },

      shippingDetails: {
        "@type": "OfferShippingDetails",

        shippingRate: {
          "@type": "MonetaryAmount",
          currency: "INR",
          value: 99,
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

        applicableCountry: {
          "@type": "Country",
          name: "IN",
        },

        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",

        merchantReturnDays: 1,

        returnMethod: "https://schema.org/ReturnByMail",

        returnFees: "https://schema.org/ReturnShippingFees",

        returnShippingFeesAmount: {
          "@type": "MonetaryAmount",
          value: 99,
          currency: "INR",
        },
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
