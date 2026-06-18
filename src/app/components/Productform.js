"use client";

import { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const Productform = ({ onClose, onSuccess, product = null, isEdit = false, }) => {
    const initialFormState = {
        title: product?.title || "",
        category: product?.category || "",
        description: product?.description?.text || "",
        featuredTags:
            product?.description?.featured?.join("; ") || "",
        sku: product?.sku || "",
        MRP: product?.MRP || "",
        SP: product?.SP || "",
        featured: product?.isfeatured || false,
        variants: product?.variants || [
            {
                colorName: "",
                inStock: true,
                sizes: [],
                images: [],
            },
        ],
    };
    const [formState, setFormState] = useState(initialFormState);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormState((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    const addVariant = () => {
        setFormState((prev) => ({
            ...prev,
            variants: [
                ...prev.variants,
                {
                    colorName: "",
                    inStock: true,
                    sizes: [],
                    images: [],
                },
            ],
        }));
    };

    const removeVariant = (index) => {
        if (formState.variants.length === 1) {
            toast.warning("At least one variant is required");
            return;
        }

        setFormState((prev) => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index),
        }));
    };

    const updateVariant = (index, field, value) => {
        setFormState((prev) => {
            const updated = [...prev.variants];

            updated[index] = {
                ...updated[index],
                [field]: value,
            };

            return {
                ...prev,
                variants: updated,
            };
        });
    };

    const uploadVariantImages = async (
        event,
        variantIndex
    ) => {
        const files = Array.from(event.target.files || []);

        for (const file of files) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch("/api/media", {
                    method: "POST",
                    body: formData,
                });

                const result = await response.json();

                setFormState((prev) => {
                    const variants = [...prev.variants];

                    variants[variantIndex] = {
                        ...variants[variantIndex],
                        images: [
                            ...variants[variantIndex].images,
                            {
                                name: file.name,
                                url: result.secure_url,
                                public_id: result.public_id,
                            },
                        ],
                    };

                    return {
                        ...prev,
                        variants,
                    };
                });
            } catch (error) {
                console.error(error);
            }
            console.log("Form state after image upload:", formState);
        }

        event.target.value = "";
    };

    const removeVariantImage = async (
        variantIndex,
        image
    ) => {
        try {
            const response = await fetch("/api/media", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    public_id: image.public_id,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to delete image"
                );
            }

            setFormState((prev) => {
                const variants = [...prev.variants];

                variants[variantIndex] = {
                    ...variants[variantIndex],
                    images: variants[
                        variantIndex
                    ].images.filter(
                        (img) =>
                            img.public_id !== image.public_id
                    ),
                };

                return {
                    ...prev,
                    variants,
                };
            });

            toast.success("Image removed");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const hasImages = formState.variants.some(
            (variant) => variant.images.length > 0
        );

        if (!hasImages) {
            toast.warning(
                "Upload at least one variant image."
            );
            return;
        }

        setSubmitting(true);

        try {
            const body = {
                title: formState.title,
                category: formState.category,

                description: {
                    text: formState.description,
                    featured: formState.featuredTags
                        .split(";")
                        .map((x) => x.trim())
                        .filter(Boolean),
                },

                sku: formState.sku,

                MRP: Number(formState.MRP),
                SP: Number(formState.SP),
                isfeatured: formState.featured,

                variants: formState.variants,
            };
            const url = isEdit
                ? `/api/products/${product._id}`
                : "/api/products";

            const method = isEdit ? "PATCH" : "POST";
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to create product");
            }

            toast.success("Product created successfully");
            setFormState(initialFormState);
            setImages([]);
            onSuccess();
        } catch (error) {
            toast.error(`Submit failed: ${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="w-full max-w-4xl rounded-3xl bg-[#101010] border border-[#262626] p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#99ef12]/80">
                        Product Management
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold text-white">
                        {isEdit ? "Edit" : "Add New"} Product
                    </h2>
                </div>

                <button
                    onClick={onClose}
                    className="text-3xl cursor-pointer text-neutral-400 hover:text-[#99ef12] transition font-light"
                >
                    ×
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title & Category */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">Title</span>
                        <input
                            name="title"
                            value={formState.title}
                            onChange={handleChange}
                            required
                            className="mt-3 block w-full rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-[#99ef12] focus:ring-2 focus:ring-[#99ef12]/20"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">Category</span>
                        <select
                            name="category"
                            value={formState.category}
                            onChange={handleChange}
                            required
                            className="mt-3 block w-full rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-[#99ef12] focus:ring-2 focus:ring-[#99ef12]/20"
                        >
                            <option value="">Select category</option>
                            <option value="running-shoes">Running Shoes</option>
                            <option value="football-studs">Football Studs</option>
                            <option value="casual-shoes">Casual Shoes</option>
                            <option value="jersey">Jersey</option>
                            <option value="accessories">Sports Accessories</option>
                        </select>
                    </label>
                </div>

                {/* Description */}
                <label className="block">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">Description</span>
                    <textarea
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        rows={4}
                        className="mt-3 block w-full rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-[#99ef12] focus:ring-2 focus:ring-[#99ef12]/20 resize-none"
                    />
                </label>

                {/* SKU & Featured Tags */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">SKU</span>
                        <input
                            name="sku"
                            value={formState.sku}
                            onChange={handleChange}
                            className="mt-3 block w-full rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-[#99ef12] focus:ring-2 focus:ring-[#99ef12]/20"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">Featured Tags</span>
                        <input
                            name="featuredTags"
                            value={formState.featuredTags}
                            onChange={handleChange}
                            placeholder="separated by semicolon"
                            className="mt-3 block w-full rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-[#99ef12] focus:ring-2 focus:ring-[#99ef12]/20"
                        />
                    </label>
                </div>

                {/* Pricing */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">MRP</span>
                        <input
                            name="MRP"
                            value={formState.MRP}
                            onChange={handleChange}
                            type="number"
                            min="0"
                            step="0.01"
                            required
                            className="mt-3 block w-full rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-[#99ef12] focus:ring-2 focus:ring-[#99ef12]/20"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">Selling Price</span>
                        <input
                            name="SP"
                            value={formState.SP}
                            onChange={handleChange}
                            type="number"
                            min="0"
                            step="0.01"
                            required
                            className="mt-3 block w-full rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-[#99ef12] focus:ring-2 focus:ring-[#99ef12]/20"
                        />
                    </label>
                </div>

                {/* Featured Checkbox */}
                <label className="flex items-center gap-3 rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] p-4">
                    <input
                        name="featured"
                        type="checkbox"
                        checked={formState.featured}
                        onChange={handleChange}
                        className="h-5 w-5 rounded border-[#4d4d4d] bg-[#0b0b0b] text-[#99ef12] cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-neutral-200">Mark as Featured Product</span>
                </label>

                {/* Variants Section */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-[0.2em]">
                        Product Variants
                    </h3>

                    <div className="space-y-4">
                        {formState.variants.map((variant, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] p-5 space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-white">
                                        Color Variant {index + 1}
                                    </h4>

                                    {formState.variants.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeVariant(index)}
                                            className="rounded-lg bg-red-600/20 px-3 py-1 text-sm font-semibold text-red-400 hover:bg-red-600/30 transition"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <label className="block">
                                        <span className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em]">
                                            Color Name
                                        </span>

                                        <input
                                            value={variant.colorName}
                                            onChange={(e) =>
                                                updateVariant(
                                                    index,
                                                    "colorName",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g., Black"
                                            required
                                            className="mt-3 w-full rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-[#99ef12] focus:ring-2 focus:ring-[#99ef12]/20"
                                        />
                                    </label>

                                    <label className="flex items-center gap-3 rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={variant.inStock > 0}
                                            onChange={(e) =>
                                                updateVariant(
                                                    index,
                                                    "inStock",
                                                    e.target.checked ? 1 : 0
                                                )
                                            }
                                            className="h-5 w-5 rounded border-[#4d4d4d] bg-[#0b0b0b] text-[#99ef12] cursor-pointer"
                                        />
                                        <span className="text-sm font-semibold text-neutral-200">In Stock</span>
                                    </label>
                                </div>

                                <label className="block">
                                    <span className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em]">
                                        Sizes
                                    </span>

                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {[4, 5, 6, 7, 8, 9, 10, 11].map((size) => (
                                            <button
                                                type="button"
                                                key={size}
                                                onClick={() => {
                                                    const exists =
                                                        variant.sizes.includes(size);

                                                    updateVariant(
                                                        index,
                                                        "sizes",
                                                        exists
                                                            ? variant.sizes.filter(
                                                                (s) => s !== size
                                                            )
                                                            : [...variant.sizes, size]
                                                    );
                                                }}
                                                className={`px-4 py-2 rounded-lg cursor-pointer font-semibold transition border ${variant.sizes.includes(size)
                                                    ? "bg-[#99ef12] text-[#0b0b0b] border-[#99ef12]"
                                                    : "bg-[#0b0b0b] text-neutral-300 border-[#2e2e2e] hover:border-[#99ef12]"
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em]">
                                        Variant Images
                                    </span>

                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) =>
                                            uploadVariantImages(e, index)
                                        }
                                        className="mt-3 w-full px-4 py-3 rounded-2xl border border-[#2e2e2e] bg-[#0b0b0b] text-neutral-300 file:bg-[#99ef12] file:text-[#0b0b0b] file:border-0 file:rounded-lg file:px-4 file:py-2 file:font-semibold cursor-pointer"
                                    />
                                </label>

                                {variant.images.length > 0 && (
                                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                        {variant.images.map((image) => (
                                            <div
                                                key={image.public_id}
                                                className="relative overflow-hidden rounded-lg border border-[#2e2e2e]"
                                            >
                                                <Image
                                                    src={image.url}
                                                    alt="variant preview"
                                                    className="h-24 w-full object-cover"
                                                    height={100}
                                                    width={100}
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeVariantImage(
                                                            index,
                                                            image
                                                        )
                                                    }
                                                    className="absolute cursor-pointer hover:bg-red-700 right-2 top-2 rounded-full bg-red-600 px-1.5 text-white font-semibold transition"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Variant Button */}
                <button
                    type="button"
                    onClick={addVariant}
                    className="w-full rounded-2xl border border-[#99ef12] bg-transparent px-5 py-3 font-semibold text-[#99ef12] hover:bg-[#99ef12]/10 transition cursor-pointer uppercase tracking-[0.2em]"
                >
                    + Add Another Color
                </button>

                {/* Submit Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-[#2e2e2e]">
                    <button
                        type="submit"
                        disabled={submitting || uploading}
                        className="inline-flex items-center cursor-pointer justify-center rounded-2xl bg-[#99ef12] px-6 py-3 text-sm font-semibold text-[#0b0b0b] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100"
                    >
                        {submitting
                            ? "Saving..."
                            : isEdit
                                ? "Update Product"
                                : "Create Product"}
                    </button>
                    {(uploading || submitting) && (
                        <p className="text-sm text-neutral-400">
                            {uploading ? "Uploading images..." : "Processing..."}
                        </p>
                    )}
                </div>
            </form>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    </div>
    );
}

export default Productform
