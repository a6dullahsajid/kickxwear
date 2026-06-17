"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Productform from "../components/Productform";

export default function AdminPage() {
    const [products, setProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditProduct, setShowEditProduct] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [featured, setFeatured] = useState(false);
    const [stock, setStock] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const params = new URLSearchParams();

                if (search.trim()) {
                    params.append("search", search.trim());
                }

                if (category !== "all") {
                    params.append("category", category);
                }

                if (featured) {
                    params.append("featured", "true");
                }

                if (stock) {
                    params.append("stock", "true");
                }

                const url = params.toString()
                    ? `/api/products?${params.toString()}`
                    : "/api/products";

                const response = await fetch(url);

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to fetch products"
                    );
                }

                setProducts(data);
            } catch (error) {
                console.error(
                    "Error fetching products:",
                    error
                );
            }
        };

        getProducts();
    }, [
        showAddProduct,
        showEditProduct,
        search,
        category,
        featured,
        stock,
    ]);


    return (
        <div className="min-h-screen p-4 md:p-8 bg-bg-dark text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#99ef12]/80">
                        Product Management
                    </p>
                    <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-white">
                        All Products
                    </h1>
                </div>

                <button
                    onClick={() => setShowAddProduct(true)}
                    className="inline-flex items-center justify-center rounded-3xl bg-[#99ef12] px-5 py-3 text-sm font-semibold text-[#0b0b0b] shadow-[0_18px_45px_rgba(153,239,18,0.18)] transition hover:brightness-95"
                >
                    Add Product
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-8">
                <div className="rounded-3xl border border-[#262626] bg-[#101010] p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                        Search
                    </p>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mt-3 w-full rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition focus:border-[#99ef12] focus:ring-2 focus:ring-[#99ef12]/20"
                    />
                </div>

                <div className="rounded-3xl border border-[#262626] bg-[#101010] p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                        Category
                    </p>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-3 w-full rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition focus:border-[#99ef12] focus:ring-2 focus:ring-[#99ef12]/20"
                    >
                        <option value="all">All Categories</option>
                        <option value="casual-shoes">Casual Shoes</option>
                        <option value="football-studs">Football Studs</option>
                        <option value="running-shoes">Running Shoes</option>
                        <option value="jersey">Jersey</option>
                        <option value="accessories">Sports Accessories</option>
                    </select>
                </div>

                <div className="rounded-3xl border border-[#262626] bg-[#101010] p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                        Filters
                    </p>
                    <div className="mt-3 space-y-3">
                        <label className="flex items-center gap-3 rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] px-4 py-3">
                            <input
                                type="checkbox"
                                checked={featured}
                                onChange={(e) => setFeatured(e.target.checked)}
                                className="h-4 w-4 rounded border-neutral-600 bg-[#111111] text-[#99ef12] focus:ring-[#99ef12]"
                            />
                            <span className="text-sm text-neutral-200">Featured</span>
                        </label>

                        <label className="flex items-center gap-3 rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] px-4 py-3">
                            <input
                                type="checkbox"
                                checked={stock}
                                onChange={(e) => setStock(e.target.checked)}
                                className="h-4 w-4 rounded border-neutral-600 bg-[#111111] text-[#99ef12] focus:ring-[#99ef12]"
                            />
                            <span className="text-sm text-neutral-200">In Stock</span>
                        </label>
                    </div>
                </div>

                <div className="rounded-3xl border border-[#262626] bg-[#101010] p-4 flex flex-col justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                            Reset
                        </p>
                        <p className="mt-3 text-sm text-neutral-400">
                            Clear query and filters to see every product.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setSearch("");
                            setCategory("all");
                            setFeatured(false);
                            setStock(false);
                        }}
                        className="mt-4 inline-flex items-center justify-center rounded-2xl border border-[#99ef12] bg-transparent px-4 py-3 text-sm font-semibold text-[#99ef12] transition hover:bg-[#99ef12]/10"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="flex flex-col gap-2 min-w-fit md:min-w-full">
                    <div className="grid grid-cols-[120px_1fr_100px_80px_80px_150px_80px_100px] gap-4 px-4 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] bg-[#0b0b0b] rounded-t-2xl border border-b-0 border-[#262626]">
                        <div>Product</div>
                        <div></div>
                        <div>Price</div>
                        <div className="text-center">Stock</div>
                        <div className="text-center">Variants</div>
                        <div>Description</div>
                        <div className="text-center">Featured</div>
                        <div className="text-right pr-2">Actions</div>
                    </div>

                    {products.map((product) => (
                        <ProductRow
                            key={product._id}
                            product={product}
                            onEdit={() => {
                                setSelectedProduct(product);
                                setShowEditProduct(true);
                            }}
                        />
                    ))}
                </div>
            </div>

            {showEditProduct && (
                <Productform
                    isEdit={true}
                    product={selectedProduct}
                    onClose={() => {
                        setShowEditProduct(false);
                        setSelectedProduct(null);
                    }}
                    onSuccess={() => {
                        setShowEditProduct(false);
                    }}
                />
            )}

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



const ProductRow = ({ product, onEdit }) => {
    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this product?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `/api/products/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message
                );
            }

            toast.success(
                "Product deleted successfully"
            );

            getProducts();
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <div className="grid grid-cols-[120px_1fr_100px_80px_80px_150px_80px_100px] gap-4 items-center px-4 py-4 border border-[#262626] bg-[#101010] hover:bg-[#151515] transition rounded-lg">
            {/* Product Image & Details */}
            <div className="relative flex items-center">
                <div className="relative w-24 h-24 bg-[#0b0b0b] rounded-lg overflow-hidden">
                    <Image
                        src={product.variants[0]?.images?.[0]?.url || '/placeholder.png'}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        className="object-cover"
                    />
                    {product.isfeatured && (
                        <span className="absolute top-1 left-1 rounded-full bg-[#99ef12] px-2 py-0.5 text-[8px] font-bold text-[#0b0b0b]">
                            Featured
                        </span>
                    )}
                </div>
            </div>

            {/* Name, Category, SKU */}
            <div className="flex flex-col gap-1">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    {product.category}
                </p>
                <h3 className="font-semibold text-white">
                    {product.title}
                </h3>
                <p className="text-xs text-neutral-500 uppercase">
                    {product.sku}
                </p>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-[#99ef12]">
                    ₹{product.SP}
                </p>
                <p className="text-xs text-neutral-500 line-through">
                    ₹{product.MRP}
                </p>
            </div>

            {/* Stock Status */}
            <div className="text-center">
                {product.variants.some((variant) => variant.inStock) ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-100/20 px-2 py-1 text-xs font-semibold text-emerald-400">
                        In Stock
                    </span>
                ) : (
                    <span className="inline-flex items-center rounded-full bg-red-100/20 px-2 py-1 text-xs font-semibold text-red-400">
                        Out of Stock
                    </span>
                )}
            </div>

            {/* Variants Count */}
            <div className="text-center">
                <p className="text-sm font-semibold text-neutral-200">
                    {product.variants.length}
                </p>
            </div>

            {/* Description */}
            <div className="text-xs text-neutral-400 line-clamp-2">
                {product.description?.text?.slice(0, 60) || ''}...
            </div>

            {/* Featured Points Count */}
            <div className="text-center">
                <p className="text-sm font-semibold text-neutral-200">
                    {product.description?.featured?.length || 0}
                </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end">
                <button
                    onClick={onEdit}
                    className="rounded-lg border border-[#4d4d4d] bg-transparent px-3 py-1 text-xs font-semibold text-white transition hover:border-[#99ef12] hover:text-[#99ef12]"
                >
                    Edit
                </button>
                <button
                    onClick={() => deleteProduct(product._id)}
                    className="rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}