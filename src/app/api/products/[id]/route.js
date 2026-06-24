import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Products";

export async function PATCH(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const body = await req.json();

        const {
            title,
            category,
            sku,
            description,
            MRP,
            SP,
            isFeatured,
            variants,
        } = body;

        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                {
                    status: 404,
                }
            );
        }

        const updatedProduct =
            await Product.findByIdAndUpdate(
                id,
                {
                    title,
                    category,
                    sku,
                    description,
                    MRP,
                    SP,
                    isFeatured,
                    variants,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

        return NextResponse.json(
            {
                success: true,
                message:
                    "Product updated successfully",
                data: updatedProduct,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error.message ||
                    "Failed to update product",
            },
            {
                status: 500,
            }
        );
    }
}