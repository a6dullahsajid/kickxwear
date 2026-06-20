import bcrypt from "bcryptjs";
import connectDB from "@/app/lib/mongodb";
import Admin from "@/app/models/Admin";

export async function GET() {
    try {
        await connectDB();

        const existingAdmin =
            await Admin.findOne({
                email: "kickxwear.in@gmail.com",
            });

        if (existingAdmin) {
            return Response.json({
                message:
                    "Admin already exists",
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                "12kickxwear12",
                10
            );

        await Admin.create({
            email: "kickxwear.in@gmail.com",
            password:
                hashedPassword,
        });

        return Response.json({
            success: true,
            message:
                "Admin created successfully",
        });
    } catch (error) {
        return Response.json(
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