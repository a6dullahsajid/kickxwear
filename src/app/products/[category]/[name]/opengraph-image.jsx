import { ImageResponse } from "next/og";
import Product from "@/app/models/Products";
import connectDB from "@/app/lib/mongodb";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }) {
  await connectDB();

  const { name } = await params;

  const title = decodeURIComponent(name).replace(/-/g, " ").toUpperCase();

  const product = await Product.findOne({
    title,
  }).lean();

  if (!product) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          fontSize: 60,
          fontWeight: 700,
        }}
      >
        Product Not Found
      </div>,
      size,
    );
  }

  const image = product.variants?.[0]?.images?.[0]?.url;
  // Fetch remote image and convert to Base64
  let imageData = null;

  try {
    const response = await fetch(image);

    if (response.ok) {
      const type = response.headers.get("content-type");
      const buffer = Buffer.from(await response.arrayBuffer());

      imageData = `data:${type};base64,${buffer.toString("base64")}`;
    }
  } catch (e) {
    console.error(e);
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#fff",
        padding: "60px",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      {/* LEFT */}

      <div
        style={{
          width: "45%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#000000",
            fontSize: 30,
            fontFamily: "calibri, sans-serif",
            fontWeight: "bold",
            letterSpacing: 3,
          }}
        >
          KICK<span style={{ color: "#99EF12" }}>X</span>WEAR
        </div>

        <div
          style={{
            marginTop: 50,
            fontSize: 56,
            fontWeight: 800,
            color: "#000",
            lineHeight: 1.1,
          }}
        >
          {product.title}
        </div>

        <div
          style={{
            marginTop: 5,
            color: "#666",
            fontSize: 28,
          }}
        >
          {product.category
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())}
        </div>

        <div
          style={{
            marginTop: 25,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span
            style={{
              fontSize: 54,
              fontWeight: 700,
              color: "#111",
            }}
          >
            ₹{product.SP}
          </span>

          <span
            style={{
              fontSize: 32,
              color: "#888",
              textDecoration: "line-through",
            }}
          >
            ₹{product.MRP}
          </span>
        </div>

        <div
          style={{
            marginTop: "auto",
            fontSize: 24,
            color: "#444",
          }}
        >
          kickxwear.in
        </div>
      </div>

      {/* RIGHT */}

      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={imageData}
          alt={product.title}
          style={{
            width: 680,
            height: 680,
            objectFit: "contain",
            display: "flex",
          }}
        />
      </div>
    </div>,
    size,
  );
}
