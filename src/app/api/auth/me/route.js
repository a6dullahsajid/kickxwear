
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/mongodb";
import Customer from "@/app/models/Customer";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const token = request.cookies.get("customerToken")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not logged in." },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "customer" || !decoded.id) {
      return NextResponse.json(
        { success: false, message: "Invalid session." },
        { status: 401 }
      );
    }

    await connectDB();

    const customer = await Customer.findById(decoded.id).select(
      "_id name email phone addresses"
    );

    if (!customer) {
      return NextResponse.json(
        { success: false, message: "Customer not found." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      customer: {
        id: customer._id.toString(),
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        addresses: customer.addresses,
      },
    });
  } catch (error) {
    if (error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Session expired or invalid." },
        { status: 401 }
      );
    }

    console.error("Customer session error:", error.message);

    return NextResponse.json(
      { success: false, message: "Unable to check your session." },
      { status: 500 }
    );
  }
}