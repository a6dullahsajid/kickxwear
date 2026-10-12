
import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import jwt from "jsonwebtoken";

import connectDB from "@/app/lib/mongodb";
import EmailOTP from "@/app/models/EmailOTP";
import Customer from "@/app/models/Customer";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const otp =
      typeof body.otp === "string"
        ? body.otp.trim()
        : "";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(email) ||
      email.length > 254 ||
      !/^\d{6}$/.test(otp)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or verification code.",
        },
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    await connectDB();

    const otpRecord = await EmailOTP.findOne({ email });

    if (!otpRecord || otpRecord.expiresAt <= new Date()) {
      if (otpRecord) {
        await EmailOTP.deleteOne({ _id: otpRecord._id });
      }

      return NextResponse.json(
        {
          success: false,
          message: "The verification code is invalid or expired.",
        },
        { status: 400 }
      );
    }

    if (otpRecord.attempts >= 5) {
      await EmailOTP.deleteOne({ _id: otpRecord._id });

      return NextResponse.json(
        {
          success: false,
          message: "Too many attempts. Request a new code.",
        },
        { status: 429 }
      );
    }

    const submittedHash = createHash("sha256")
      .update(otp)
      .digest("hex");

    const expected = Buffer.from(otpRecord.otpHash, "hex");
    const submitted = Buffer.from(submittedHash, "hex");

    const isValid =
      expected.length === submitted.length &&
      timingSafeEqual(expected, submitted);

    if (!isValid) {
      otpRecord.attempts += 1;
      await otpRecord.save();

      return NextResponse.json(
        {
          success: false,
          message: "The verification code is incorrect.",
        },
        { status: 400 }
      );
    }

    // Consume the OTP before creating the session.
    const consumedOTP = await EmailOTP.findOneAndDelete({
      _id: otpRecord._id,
      otpHash: otpRecord.otpHash,
      attempts: { $lt: 5 },
      expiresAt: { $gt: new Date() },
    });

    if (!consumedOTP) {
      return NextResponse.json(
        {
          success: false,
          message: "The verification code is invalid or expired.",
        },
        { status: 400 }
      );
    }

    // Find an existing customer or create a new account.
    const customer = await Customer.findOneAndUpdate(
      { email },
      {
        $setOnInsert: { email },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    const token = jwt.sign(
      {
        id: customer._id.toString(),
        email: customer.email,
        role: "customer",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      verified: true,
      message: "Login successful.",
      customer: {
        id: customer._id.toString(),
        name: customer.email.split("@")[0],
        email: customer.email,
      },
    });

    response.cookies.set("customerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Verify OTP error:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to verify the code right now.",
      },
      { status: 500 }
    );
  }
}
