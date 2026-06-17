import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Products";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);

        const search = searchParams.get("search");
        const category = searchParams.get("category");
        const featured = searchParams.get("featured");
        const stock = searchParams.get("stock");

        // No filters -> return all products
        if (!search && !category && !featured && !stock) {
            const products = await Product.find()
                .sort({ createdAt: -1 })
                .lean();

            return Response.json(products, {
                status: 200,
            });
        }

        const query = {};

        // Search by title (uses text index)
        if (search?.trim()) {
            query.title = {
                $regex: search.trim(),
                $options: "i",
            };
        }

        // Category filter
        if (category && category !== "all") {
            query.category = category;
        }

        // Featured filter
        if (featured === "true") {
            query.isfeatured = true;
        }

        // Stock filter
        if (stock === "true") {
            query["variants.inStock"] = true;
        }
        console.log("Querying products with filters:", query);
        const products = await Product.find(query)
            .sort({ createdAt: -1 })
            .lean();

        return Response.json(products, {
            status: 200,
        });
    } catch (error) {
        console.error(
            "GET /api/products error:",
            error
        );

        return Response.json(
            {
                success: false,
                message: "Failed to fetch products",
                error: error.message
            },
            {
                status: 500,
            }
        );
    }
}

// Add a product
export async function POST(req) {
    try {
        await connectDB();

        const data = await req.json();
        console.log("Received product data:", data);

        const product = await Product.create(data);

        return Response.json(
            {
                message: "Product added successfully",
                product,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);

        return Response.json(
            { message: "Failed to add product" },
            { status: 500 }
        );
    }
}