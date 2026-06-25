export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",

    "@type": "WebSite",

    name: "Kickxwear",

    url: process.env.NEXT_PUBLIC_SITE_URL,
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
