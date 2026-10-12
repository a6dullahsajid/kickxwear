
import { NextResponse } from "next/server";
import transporter from "@/app/lib/mailer";

export const runtime = "nodejs";

export async function GET() {
  try {
    await transporter.sendMail({
      from: {
        name: "Kickxwear",
        address: process.env.SMTP_EMAIL,
      },
      to: process.env.SMTP_EMAIL,
      subject: "Kickxwear Email Test",
      text: "Success! Your Kickxwear email transporter is working.",
    });

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully.",
    });
  } catch (error) {
    console.error("Email test failed:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send test email.",
      },
      { status: 500 }
    );
  }
}
