import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

import connectDB from "@/app/lib/mongodb";
import Admin from "@/app/models/Admin";

export async function POST(req) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Email and password are required",
                },
                {
                    status: 400,
                }
            );
        }

        const admin = await Admin.findOne({
            email,
        });

        if (!admin) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid credentials",
                },
                {
                    status: 401,
                }
            );
        }

        const isMatch =
            await bcrypt.compare(
                password,
                admin.password
            );

        if (!isMatch) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid credentials",
                },
                {
                    status: 401,
                }
            );
        }

        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                role: "admin",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            }
        );

        const response =
            NextResponse.json({
                success: true,
                message:
                    "Login successful",
            });

        response.cookies.set(
            "adminToken",
            token,
            {
                httpOnly: true,
                secure:
                    process.env
                        .NODE_ENV ===
                    "production",
                sameSite: "strict",
                maxAge:
                    60 *
                    60 *
                    24 *
                    30,
                path: "/",
            }
        );

        return response;
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error.message,
            },
            {
                status: 500,
            }
        );
    }
}