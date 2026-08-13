import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/Order";
export async function GET(req) {
  try {
    await connectDB();

    const orders = await Order.find().sort({ createdAt: -1 }).lean();

    return Response.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return Response.json({ success: false, message: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const order = await Order.create(data);

    return Response.json(
      {
        message: "Order saved successfully",
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/orders error:", error);

    return Response.json(
      { success: false, message: "Failed to save order", error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDB();

    const data = await req.json();

    const { id, status } = data;

    if (!id || !status) {
      return Response.json({ success: false, message: "Missing id or status" }, { status: 400 });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true }).lean();

    return Response.json({ message: "Order updated", order }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/orders error:", error);
    return Response.json({ success: false, message: "Failed to update order", error: error.message }, { status: 500 });
  }
}
