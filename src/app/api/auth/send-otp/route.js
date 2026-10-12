import { NextResponse } from "next/server";
import { randomInt, createHash } from "crypto";

import connectDB from "@/app/lib/mongodb";
import transporter from "@/app/lib/mailer";
import EmailOTP from "@/app/models/EmailOTP";

export const runtime = "nodejs";

export async function POST(request) {
    try {
        const body = await request.json();
        const email =
            typeof body.email === "string"
                ? body.email.trim().toLowerCase()
                : "";

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email) || email.length > 254) {
            return NextResponse.json(
                { success: false, message: "Enter a valid email address." },
                { status: 400 }
            );
        }

        await connectDB();

        const now = new Date();

        // Enforce a 60-second resend cooldown.
        const existingOTP = await EmailOTP.findOne({ email });

        if (
            existingOTP &&
            now - existingOTP.createdAt < 60_000
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please wait before requesting another OTP.",
                },
                { status: 429 }
            );
        }

        // Generate a cryptographically secure six-digit OTP.
        const otp = randomInt(100000, 1000000).toString();

        const otpHash = createHash("sha256")
            .update(otp)
            .digest("hex");

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        // Store the new OTP before attempting delivery.
        await EmailOTP.findOneAndUpdate(
            { email },
            {
                $set: {
                    otpHash,
                    expiresAt,
                    attempts: 0,
                },
            },
            { upsert: true, new: true, runValidators: true }
        );

        try {
            await transporter.sendMail({
                from: {
                    name: "Kickxwear",
                    address: process.env.SMTP_EMAIL,
                },
                to: email,
                subject: "Your Kickxwear verification code",
                text: `Use ${otp} to verify your email. It expires in 5 minutes. Do not share this code with anyone.`,
                html: `
          <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;color:#222">
            <h2>Verify your email</h2>
            <div style="font-size:32px;font-weight:bold;letter-spacing:8px;padding:16px 0">
            ${otp}
            </div>
            <p>Use the above code to continue to Kickxwear.</p>
            <p>This code expires in 5 minutes. If you didn't request it, you can ignore this email.</p>
          </div>
        `,
            });
        } catch (error) {
            // Invalidate the code if delivery fails.
            await EmailOTP.deleteOne({ email });
            throw error;
        }

        return NextResponse.json({
            success: true,
            message: "If the address can receive email, a verification code has been sent.",
        });
    } catch (error) {
        console.error("Send OTP error:", error.message);

        return NextResponse.json(
            { success: false, message: "Unable to send a verification code right now." },
            { status: 500 }
        );
    }
}
