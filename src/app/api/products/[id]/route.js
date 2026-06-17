import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Products";
import cloudinary from "@/app/lib/cloudinary";

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const product = await Product.findById(
            id
        );

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

        // Delete images from Cloudinary
        for (const variant of product.variants) {
            for (const image of variant.images) {
                try {
                    await cloudinary.uploader.destroy(
                        image.public_id
                    );
                } catch (error) {
                    console.error(
                        `${product.title} images deletion failed`,
                        error
                    );
                }
            }
        }

        await Product.findByIdAndDelete(
            id
        );

        return NextResponse.json({
            success: true,
            message:
                "Product deleted successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error.message ||
                    "Failed to delete product",
            },
            {
                status: 500,
            }
        );
    }
}

export async function PATCH(req, { params }) {
    try {
        await connectDB();

        const body = await req.json();

        const {
            title,
            category,
            sku,
            description,
            MRP,
            SP,
            isfeatured,
            variants,
        } = body;
        const { id } = await params;

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
                    isfeatured,
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