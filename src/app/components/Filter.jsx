"use client";

import { useState } from "react";
import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const category =
    pathname.split("/")[2] || "all";

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [featured, setFeatured] =
    useState(
      searchParams.get("featured") ===
        "true"
    );

  const [stock, setStock] = useState(
    searchParams.get("stock") === "true"
  );

  const navigateWithFilters = ({
    searchValue = search,
    featuredValue = featured,
    stockValue = stock,
    categoryValue = category,
  }) => {
    const params = new URLSearchParams();

    if (searchValue.trim()) {
      params.set("search", searchValue);
    }

    if (featuredValue) {
      params.set("featured", "true");
    }

    if (stockValue) {
      params.set("stock", "true");
    }

    const queryString = params.toString();

    const url =
      categoryValue === "all"
        ? `/products${
            queryString
              ? `?${queryString}`
              : ""
          }`
        : `/products/${categoryValue}${
            queryString
              ? `?${queryString}`
              : ""
          }`;

    router.push(url);
  };

  const handleCategoryChange = (
    value
  ) => {
    navigateWithFilters({
      categoryValue: value,
    });
  };

  const handleSearchChange = (
    value
  ) => {
    setSearch(value);

    navigateWithFilters({
      searchValue: value,
    });
  };

  const handleFeaturedChange = (
    value
  ) => {
    setFeatured(value);

    navigateWithFilters({
      featuredValue: value,
    });
  };

  const handleStockChange = (
    value
  ) => {
    setStock(value);

    navigateWithFilters({
      stockValue: value,
    });
  };

  const resetFilters = () => {
    setSearch("");
    setFeatured(false);
    setStock(false);

    router.push(
      category === "all"
        ? "/products"
        : `/products/${category}`
    );
  };

  const categories = [
    {
      value: "all",
      label: "All Products",
    },
    {
      value: "football-studs",
      label: "Football Studs",
    },
    {
      value: "running-shoes",
      label: "Running Shoes",
    },
    {
      value: "casual-shoes",
      label: "Casual Shoes",
    },
    {
      value: "jersey",
      label: "Jerseys",
    },
    {
      value: "accessories",
      label: "Accessories",
    },
  ];

  return (
    <div className="px-8 md:px-12 mb-8">
      <div className="flex flex-col gap-4">

        {/* Categories */}
        <div className="flex flex-wrap gap-1 md:gap-2">
          {categories.map((item) => (
            <button
              key={item.value}
              onClick={() =>
                handleCategoryChange(
                  item.value
                )
              }
              className={`p-1.5 md:px-3 md:py-2 text-sm transition ${
                category === item.value
                  ? "border-b-2 border-black font-semibold text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">

          <div className="flex-1 min-w-[250px]">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                handleSearchChange(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[#99ef12]"
            />
          </div>

          <label className="flex items-center md:gap-2 whitespace-nowrap rounded-lg border border-gray-300 p-1.5 md:px-4 md:py-2">
            <input
              type="checkbox"
              checked={featured}
              className="h-2 md:h-3"
              onChange={(e) =>
                handleFeaturedChange(
                  e.target.checked
                )
              }
            />
            Featured Products
          </label>

          <label className="flex items-center md:gap-2 whitespace-nowrap rounded-lg border border-gray-300 p-1.5 md:px-4 md:py-2">
            <input
              type="checkbox"
              checked={stock}
              className="h-2 md:h-3"
              onChange={(e) =>
                handleStockChange(
                  e.target.checked
                )
              }
            />
            In Stock
          </label>

          <button
            onClick={resetFilters}
            className="whitespace-nowrap rounded-lg border border-[#99ef12] p-1.5 md:px-4 md:py-2 font-semibold text-[#99ef12] hover:bg-[#99ef12]/10"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}