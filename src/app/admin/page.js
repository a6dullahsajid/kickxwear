"use client";

import { useState, useEffect } from "react";
import Productform from "../components/Productform";

export default function AdminPage() {
    const [products, setProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] =
        useState(false);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch("/api/products");
                const data = await response.json();
                console.log("Products:", data);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        getProducts();
    }, [showAddProduct]);

    return (
        <div className="p-8">
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl font-bold text-black">
                    Products
                </h1>

                <button
                    onClick={() =>
                        setShowAddProduct(true)
                    }
                    className="rounded-xl bg-brand px-4 py-2 text-white"
                >
                    Add Product
                </button>
            </div>

            {/* Product cards will come here */}
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>

            {showAddProduct && (
                <Productform
                    onClose={() =>
                        setShowAddProduct(false)
                    }
                    onSuccess={() => {
                        setShowAddProduct(false);
                    }}
                />
            )}
        </div>
    );
}



const ProductCard = ({ product }) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-lg">
            <div className="relative">
                <img
                    src={product.images?.[0]?.url}
                    alt={product.title}
                    className="h-52 w-full object-cover"
                />

                {product.featured && (
                    <span className="absolute left-2 top-2 rounded-full bg-amber-600 px-3 py-1 text-xs font-medium text-white">
                        Featured
                    </span>
                )}
            </div>

            <div className="p-4">
                <p className="text-xs uppercase text-zinc-500">
                    {product.category}
                </p>

                <h3 className="mt-1 line-clamp-2 text-lg font-semibold">
                    {product.title}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                    <span className="text-xl font-bold text-green-600">
                        ₹{product.SP}
                    </span>

                    <span className="text-sm text-zinc-400 line-through">
                        ₹{product.MRP}
                    </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <span
                        className={`rounded-full px-2 py-1 text-xs ${product.inStock
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                    >
                        {product.inStock
                            ? "In Stock"
                            : "Out of Stock"}
                    </span>

                    <div className="flex gap-2">
                        <button className="rounded-lg border px-3 py-1 text-sm hover:bg-zinc-100">
                            Edit
                        </button>

                        <button className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}