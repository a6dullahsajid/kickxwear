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
        <div className="p-8">
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl font-bold text-black">
                    All Products
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
            <div className="w-full h-px bg-zinc-300 mb-6">
                <div className="mb-6 flex flex-wrap items-center gap-4">
                    {/* Search */}
                    <div className="flex-1 min-w-[250px]">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-brand"
                        />
                    </div>

                    {/* Category */}
                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        className="rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-brand"
                    >
                        <option value="all">
                            All Categories
                        </option>

                        <option value="casual-shoes">
                            Casual Shoes
                        </option>

                        <option value="football-studs">
                            Football Studs
                        </option>
                        <option value="running-shoes">
                            Running Shoes
                        </option>
                        <option value="jersey">
                            Jersey
                        </option>
                        <option value="accessories">
                            Sports Accessories
                        </option>
                    </select>

                    {/* Featured */}
                    <label className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={featured}
                            onChange={(e) =>
                                setFeatured(
                                    e.target.checked
                                )
                            }
                        />

                        <span>Featured</span>
                    </label>

                    {/* Stock */}
                    <label className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={stock}
                            onChange={(e) =>
                                setStock(
                                    e.target.checked
                                )
                            }
                        />

                        <span>In Stock</span>
                    </label>

                    {/* Clear */}
                    <button
                        onClick={() => {
                            setSearch("");
                            setCategory("all");
                            setFeatured(false);
                            setStock(false);
                        }}
                        className="rounded-xl border border-red-300 px-4 py-3 text-red-500 hover:bg-red-50"
                    >
                        Reset
                    </button>
                </div>
            </div>
            {/* Product cards will come here */}
            <div className="flex flex-col gap-1 mt-12">
                <div className="w-full grid grid-cols-8 items-center gap-8 text-gray-900 text-lg font-semibold">
                    <p>Product Details</p>
                    <p className="text-white">.</p>
                    <p className="text-left ml-3">Price</p>
                    <p className="text-center">Stock Status</p>
                    <p className="text-center">Variants</p>
                    <p className="text-center">Description</p>
                    <p className="text-right">Featured Points</p>
                    <p className="text-right mr-8">Actions</p>
                </div>
                <div className="flex flex-wrap">
                    {products.map((product) => (
                        <ProductCard
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



const ProductCard = ({ product, onEdit }) => {

    return (
        <div className="overflow-hidden w-full flex items-center justify-between p-2 border border-zinc-300 bg-white">
            <div className="relative flex items-center w-[20%]">
                <div className="w-1/2 h-full flex justify-center" >
                    <img
                        src={product.variants[0]?.images?.[0]?.url}
                        alt={product.title}
                        className="h-full w-24 object-cover"
                    />
                </div>

                {product.isfeatured && (
                    <span className="absolute -left-1.5 -top-1.5 rounded-full bg-amber-600 py-0.5 px-1.5 text-xs text-white">
                        Featured
                    </span>
                )}
                <div className="ml-1 min-w-fit flex flex-col gap-1 w-[15%]">
                    <p className="text-sm uppercase text-zinc-500">
                        {product.category}
                    </p>

                    <h3 className="text-lg font-semibold">
                        {product.title}
                    </h3>
                    <p className="text-xs underline uppercase text-zinc-500">
                        {product.sku}
                    </p>
                </div>
            </div>
            <div className="flex flex-col w-[15%] pl-4">
                <span className="text-md font-bold text-green-600">
                    SP: ₹{product.SP}
                </span>

                <span className="text-md font-bold text-blue-600">
                    MRP: ₹{product.MRP}
                </span>
            </div>
            <div className="flex items-center justify-between w-[10%]">
                <span
                    className={`rounded-full px-2 py-1 text-xs`}
                >
                    {product.variants.some((variant) => variant.inStock)
                        ? <span className="rounded-full px-2 py-1 text-xs bg-green-100 text-green-700">In Stock</span>
                        : <span className="rounded-full px-2 py-1 text-xs bg-red-100 text-red-700">Out of Stock</span>}
                </span>
            </div>
            <div className="flex items-center justify-between ml-4 w-[5%]">
                {product.variants.length}
            </div>
            <div className="flex italic text-sm gap-1 pl-4 text-stone-500 items-center justify-between w-[15%]">
                {product.description.text.substring(0, 20)}...
            </div>
            <div className="flex italic text-sm gap-1 text-stone-500 items-center justify-between w-[5%]">
                {product.description.featured.length}
            </div>
            <div className="flex gap-2 w-[10%] pl-8">
                <button className="rounded border px-1 cursor-pointer text-sm hover:bg-zinc-200"
                    onClick={onEdit}
                >
                    Edit
                </button>
                <button className="rounded bg-red-500 cursor-pointer px-2 text-sm text-white hover:bg-red-600">
                    Delete
                </button>
            </div>
        </div>

    );
}