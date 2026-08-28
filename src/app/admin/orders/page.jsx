import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/Order";
import OrdersActions from "./OrdersActions";
import WhatsappClickCount from "./WhatsappClickCount";
import Product from "@/app/models/Products";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function OrdersPage({ searchParams }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;
  if (!token) {
    redirect("/admin/login");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Invalid admin token:", error);
    redirect("/admin/login");
  }

  await connectDB();

  const params = await searchParams;
  const rawTitle = params?.title || "";

  // Decode plus signs and percent-encoding from query (forms often submit spaces as '+')
  const decodeQuery = (v) => {
    if (!v) return "";
    try {
      return decodeURIComponent(String(v).replace(/\+/g, " ")).trim();
    } catch (e) {
      return String(v).replace(/\+/g, " ").trim();
    }
  };

  const titleQuery = decodeQuery(rawTitle);

  let titleTotal = 0;
  let totalsByStatus = {};
  let totalsBySize = [];

  const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  if (titleQuery) {
    const safe = escapeRegex(titleQuery);
    const matchStage = { $match: { "product.title": { $regex: `^${safe}$`, $options: "i" } } };

    const totalRes = await Order.aggregate([matchStage, { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } }]);
    titleTotal = totalRes[0]?.totalQuantity ?? 0;

    const statusRes = await Order.aggregate([
      matchStage,
      { $group: { _id: { $toLower: "$status" }, totalQuantity: { $sum: "$quantity" } } },
    ]);
    totalsByStatus = statusRes.reduce((acc, cur) => {
      acc[cur._id] = cur.totalQuantity;
      return acc;
    }, {});

    const sizeRes = await Order.aggregate([
      matchStage,
      { $group: { _id: "$variant.size", totalQuantity: { $sum: "$quantity" } } },
      { $sort: { totalQuantity: -1 } },
    ]);
    totalsBySize = sizeRes;
  }

  // Fetch product titles for dropdown (datalist)
  const products = await Product.find({}, { title: 1 }).sort({ title: 1 }).lean();

  const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Manual Orders</h1>
        <WhatsappClickCount />
        <p className="text-gray-600">No orders found.</p>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manual Orders</h1>
      <WhatsappClickCount />

      {/* Analytics Section */}
      <section className="mb-6 p-4 border rounded-lg bg-white">
        <h2 className="text-lg font-semibold mb-3">Analytics</h2>
        <form method="get" action="/admin/orders" className="flex gap-2 items-end flex-wrap">
          <div>
            <label className="block text-sm text-gray-600">Title</label>
            <input list="productTitles" name="title" defaultValue={titleQuery} placeholder="Select or search product title" className="border rounded px-2 py-1" />
            <datalist id="productTitles">
              {products?.map((p) => (
                <option key={p._id} value={p.title} />
              ))}
            </datalist>
          </div>
          <button type="submit" className="px-3 py-1 rounded bg-brand text-black">Get Totals</button>
        </form>

        {titleQuery ? (
          <div className="mt-6 grid md:grid-cols-3 gap-4 items-start">
            <div className="col-span-1 bg-gradient-to-r from-white to-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm text-gray-500">Total Quantity</div>
                <div className="text-4xl font-extrabold mt-1">{titleTotal}</div>
                <div className="text-sm text-gray-600 mt-1">for <strong>{titleQuery}</strong></div>
              </div>
            </div>

            <div className="col-span-1 flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="flex-1 p-3 rounded-lg bg-green-50 border border-green-100">
                  <div className="text-sm text-green-700">Processed</div>
                  <div className="text-2xl font-semibold">{totalsByStatus.processed ?? 0}</div>
                </div>
                <div className="flex-1 p-3 rounded-lg bg-yellow-50 border border-yellow-100">
                  <div className="text-sm text-yellow-700">Processing</div>
                  <div className="text-2xl font-semibold">{totalsByStatus.pending ?? 0}</div>
                </div>
              </div>

              <div className="mt-1 text-sm text-gray-500">Status breakdown (quantity)</div>
            </div>

            <div className="col-span-1">
              <div className="text-sm text-gray-600 mb-2">Totals by Size</div>
              <div className="flex flex-wrap gap-2">
                {totalsBySize.length > 0 ? (
                  totalsBySize.map((s) => (
                    <div key={String(s._id)} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      <span className="font-medium">{String(s._id)}</span>
                      <span className="ml-2 text-gray-600">{s.totalQuantity}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No size data</div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="text-left text-xs md:text-sm">
              <th className="px-3 py-2">Ordered At</th>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Variant</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t text-xs md:text-sm">
                <td className="px-3 py-2 align-top text-[10px] overflow-hidden whitespace-nowrap text-ellipsis">
                  {(() => {
                    const orderDate = new Date(order.createdAt);
                    const date = orderDate.toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      timeZone: "Asia/Kolkata",
                    });
                    const year = orderDate.toLocaleDateString("en-IN", {
                      year: "2-digit",
                      timeZone: "Asia/Kolkata",
                    });
                    const time = orderDate.toLocaleTimeString("en-IN", {
                      hour: "numeric",
                      minute: "2-digit",
                      timeZone: "Asia/Kolkata",
                    });

                    return `${date}, ${year}, ${time}`;
                  })()}
                </td>
                <td className="px-3 py-2 align-top">
                  <div className="font-medium">{order.product?.title}</div>
                  <div className="text-[10px] md:text-sm text-gray-500">
                    SKU: {order.product?.sku}
                  </div>
                </td>
                <td className="px-3 py-2 align-top">
                  {order.variant?.colorName}{" "}
                  {order.variant?.size && <>/ {order.variant.size}</>}
                </td>
                <td className="px-3 py-2 align-top">₹{order.price}</td>
                <td className="px-3 py-2 align-top">
                  <OrdersActions id={String(order._id)} initialStatus={String(order.status)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
