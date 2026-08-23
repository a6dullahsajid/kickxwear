import connectDB from "@/app/lib/mongodb";
import WhatsappClick from "@/app/models/WhatsappClick";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const validSources = new Set(["homepage-hero", "homepage-cta"]);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;

    if (!token) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();

    const [totalClicks, clicksBySource] = await Promise.all([
      WhatsappClick.countDocuments(),
      WhatsappClick.aggregate([
        { $group: { _id: "$source", clicks: { $sum: 1 } } },
        { $sort: { clicks: -1 } },
      ]),
    ]);

    return Response.json({
      success: true,
      totalClicks,
      clicksBySource,
    });
  } catch (error) {
    console.error("GET /api/whatsapp-clicks error:", error);

    return Response.json(
      { success: false, message: "Failed to fetch WhatsApp clicks" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const source = typeof data.source === "string" ? data.source : "";

    if (!validSources.has(source)) {
      return Response.json(
        { success: false, message: "Invalid click source" },
        { status: 400 },
      );
    }

    await connectDB();

    const click = await WhatsappClick.create({
      source,
      page: "/",
      referrer: req.headers.get("referer") || "",
      userAgent: req.headers.get("user-agent") || "",
    });

    return Response.json(
      { success: true, clickId: click._id.toString() },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/whatsapp-clicks error:", error);

    return Response.json(
      { success: false, message: "Failed to track WhatsApp click" },
      { status: 500 },
    );
  }
}
