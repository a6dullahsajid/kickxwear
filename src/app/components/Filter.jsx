"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get("search") || "");

  const [category, setCategory] = useState(params.get("category") || "all");

  const [featured, setFeatured] = useState(params.get("featured") === "true");

  const [stock, setStock] = useState(params.get("stock") === "true");

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(params);

    if (value === "" || value === false || value === "all") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    router.push(`/products?${newParams.toString()}`);
  };

  const handleChange = (key, value) => {
    switch (key) {
      case "search":
        setSearch(value);
        break;

      case "category":
        setCategory(value);
        break;

      case "featured":
        setFeatured(value);
        break;

      case "stock":
        setStock(value);
        break;
    }

    updateFilter(key, value);
  };

  const resetFilters = () => {
    router.push("/products");
  };

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Search
          </p>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => handleChange("search", e.target.value)}
            className="mt-3 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-[#99ef12] focus:ring-2 focus:ring-[#99ef12]/20"
          />
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Category
          </p>
          <select
            value={category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="mt-3 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-[#99ef12] focus:ring-2 focus:ring-[#99ef12]/20"
          >
            <option value="all">All Categories</option>
            <option value="casual-shoes">Casual Shoes</option>
            <option value="football-studs">Football Studs</option>
            <option value="running-shoes">Running Shoes</option>
            <option value="jersey">Jersey</option>
            <option value="accessories">Sports Accessories</option>
          </select>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Filters
          </p>
          <div className="mt-3 space-y-3">
            <label className="flex items-center gap-3 rounded-2xl border border-gray-300 bg-white px-4 py-3">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => handleChange("featured", e.target.checked)}
                className="h-4 w-4 rounded border-neutral-400 bg-white text-[#99ef12] focus:ring-[#99ef12]"
              />
              <span className="text-sm text-black">Featured</span>
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-gray-300 bg-white px-4 py-3">
              <input
                type="checkbox"
                checked={stock}
                onChange={(e) => handleChange("stock", e.target.checked)}
                className="h-4 w-4 rounded border-neutral-400 bg-white text-[#99ef12] focus:ring-[#99ef12]"
              />
              <span className="text-sm text-black">In Stock</span>
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-4 flex flex-col justify-between shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Reset
            </p>
            <p className="mt-3 text-sm text-neutral-500">
              Clear query and filters to see every product.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="mt-4 inline-flex items-center justify-center rounded-2xl border border-[#99ef12] bg-transparent px-4 py-3 text-sm font-semibold text-[#99ef12] transition hover:bg-[#99ef12]/10"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
