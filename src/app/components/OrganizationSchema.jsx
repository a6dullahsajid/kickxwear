export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",

    name: "Kickxwear",
    
    description: "Authorized distributor of SEGA sports footwear in India.",

    url: process.env.NEXT_PUBLIC_SITE_URL,

    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,

    vatID: "09BFPPH2013R1Z0",

    address: {
      "@type": "PostalAddress",
      streetAddress: "House No. 17, Flat No. 3, Om Purwa",
      addressLocality: "Kanpur",
      addressRegion: "Uttar Pradesh",
      postalCode: "208007",
      addressCountry: "IN",
    },

    sameAs: [
      "https://instagram.com/kickxwear.in",
      "https://www.facebook.com/p/Kickx-Wear-61590736619986/",
    ],

    contactPoint: {
      "@type": "ContactPoint",

      contactType: "customer service",

      telephone: "+91-9569603674",

      availableLanguage: ["English", "Hindi"],
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
