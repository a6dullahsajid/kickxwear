"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const Productform = ({ onClose, onSuccess, product = null, isEdit = false, }) => {
    const initialFormState = {
        title: product?.title || "",
        category: product?.category || "",
        description: product?.description?.text || "",
        featuredTags:
            product?.description?.featured?.join(", ") || "",
        sku: product?.sku || "",
        MRP: product?.MRP || "",
        SP: product?.SP || "",
        featured: product?.featured || false,
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

    // const handleFileChange = async (event) => {
    //     const files = Array.from(event.target.files || []);
    //     if (!files.length) {
    //         return;
    //     }

    //     setUploading(true);

    //     for (const file of files) {
    //         const formData = new FormData();
    //         formData.append("file", file);

    //         try {
    //             const response = await fetch("/api/media", {
    //                 method: "POST",
    //                 body: formData,
    //             });

    //             if (!response.ok) {
    //                 const errorData = await response.json();
    //                 throw new Error(errorData.message || "Image upload failed");
    //             }

    //             const result = await response.json();

    //             setImages((prev) => [
    //                 ...prev,
    //                 {
    //                     id: `${file.name}-${Date.now()}`,
    //                     name: file.name,
    //                     url: result.secure_url,
    //                     public_id: result.public_id,
    //                 },
    //             ]);
    //             toast.success(`${file.name} uploaded successfully`);
    //         } catch (error) {
    //             toast.error(`Upload failed: ${error.message}`);
    //         }
    //     }

    //     setUploading(false);
    //     event.target.value = "";
    // };
    // useEffect(() => {
    //     if (!product) return;

    //     setFormState({
    //         title: product.title || "",
    //         category: product.category || "",
    //         description: product.description?.text || "",

    //         featuredTags:
    //             product.description?.featured?.join(", ") || "",

    //         sku: product.sku || "",

    //         MRP: product.MRP || "",
    //         SP: product.SP || "",

    //         featured: product.featured || false,

    //         variants:
    //             product.variants?.length > 0
    //                 ? product.variants
    //                 : [
    //                     {
    //                         colorName: "",
    //                         stock: true,
    //                         sizes: [],
    //                         images: [],
    //                     },
    //                 ],
    //     });
    // }, [product]);

    const addVariant = () => {
        setFormState((prev) => ({
            ...prev,
            variants: [
                ...prev.variants,
                {
                    colorName: "",
                    stock: true,
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

    // const removeImage = async (image) => {
    //     try {
    //         const response = await fetch("/api/media", {
    //             method: "DELETE",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 public_id: image.public_id,
    //             }),
    //         });

    //         const result = await response.json();

    //         if (!response.ok) {
    //             throw new Error(result.message || "Failed to delete image");
    //         }

    //         setImages((prev) =>
    //             prev.filter((img) => img.id !== image.id)
    //         );

    //         toast.success("Image deleted");
    //     } catch (error) {
    //         toast.error(error.message);
    //     }
    // };

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
                        .split(",")
                        .map((x) => x.trim())
                        .filter(Boolean),
                },

                sku: formState.sku,

                MRP: Number(formState.MRP),
                SP: Number(formState.SP),
                featured: formState.featured,

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
        <div className="w-full max-w-4xl rounded-xl bg-white p-6 max-h-[90vh] overflow-y-auto">
            <div className="mb-2 flex justify-between">
                <h2 className="text-4xl text-amber-900 font-bold">
                    {isEdit ? "Edit" : "Add"} Product
                </h2>

                <button
                    onClick={onClose}
                    className="text-2xl cursor-pointer hover:text-amber-900 transition"
                >
                    ×
                </button>
            </div>
            <div className="min-h-screen text-amber-900 py-5 px-2">
                <div className="max-w-3xl rounded-3xl bg-white p-2">
                    {/* <h1 className="text-3xl font-bold mb-4">Add New Product</h1> */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-medium">Title</span>
                                <input
                                    name="title"
                                    value={formState.title}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium">Category</span>
                                <select
                                    name="category"
                                    value={formState.category}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
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

                        <label className="block">
                            <span className="text-sm font-medium">Description</span>
                            <textarea
                                name="description"
                                value={formState.description}
                                onChange={handleChange}
                                rows={4}
                                className="mt-1 block w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium">SKU</span>
                            <input
                                name="sku"
                                value={formState.sku}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                            />
                        </label>



                        <label className="block">
                            <span className="text-sm font-medium">Featured Description</span>
                            <input
                                name="featuredTags"
                                value={formState.featuredTags}
                                onChange={handleChange}
                                placeholder="comma separated"
                                className="mt-1 block w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                            />
                        </label>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-medium">MRP</span>
                                <input
                                    name="MRP"
                                    value={formState.MRP}
                                    onChange={handleChange}
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    required
                                    className="mt-1 block w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium">Selling Price</span>
                                <input
                                    name="SP"
                                    value={formState.SP}
                                    onChange={handleChange}
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    required
                                    className="mt-1 block w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                                />
                            </label>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* <label className="flex items-center gap-3">
                                <input
                                    name="inStock"
                                    type="checkbox"
                                    checked={formState.inStock}
                                    onChange={handleChange}
                                    className="h-5 w-5 rounded border-zinc-300 text-amber-600 focus:ring-amber-500"
                                />
                                <span className="text-sm">In stock</span>
                            </label> */}

                            <label className="flex items-center gap-3">
                                <input
                                    name="featured"
                                    type="checkbox"
                                    checked={formState.featured}
                                    onChange={handleChange}
                                    className="h-5 w-5 rounded border-zinc-300 text-amber-600 focus:ring-amber-500"
                                />
                                <span className="text-sm">Featured product</span>
                            </label>
                        </div>
                        <h2 className="text-xl font-bold">
                            Variants
                        </h2>

                        {formState.variants.map((variant, index) => (
                            <div
                                key={index}
                                className="space-y-4 rounded-3xl border border-zinc-200 p-5"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">
                                        Color {index + 1}
                                    </h3>

                                    {formState.variants.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeVariant(index)}
                                            className="rounded-xl bg-red-100 px-3 py-1 text-red-600"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <label className="block">
                                        <span className="text-sm font-medium">
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
                                            placeholder="Black"
                                            required
                                            className="mt-1 w-full rounded-3xl border border-zinc-300 px-4 py-3"
                                        />
                                    </label>

                                    <label className="flex items-center gap-3 pt-8">
                                        <input
                                            type="checkbox"
                                            checked={variant.stock > 0}
                                            onChange={(e) =>
                                                updateVariant(
                                                    index,
                                                    "stock",
                                                    e.target.checked ? 1 : 0
                                                )
                                            }
                                        />

                                        <span>In Stock</span>
                                    </label>
                                </div>

                                <label className="block">
                                    <span className="text-sm font-medium">
                                        Sizes
                                    </span>

                                    <div className="flex flex-wrap gap-2">
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
                                                className={`px-4 py-2 cursor-pointer hover:text-black rounded-xl border ${variant.sizes.includes(size)
                                                    ? "bg-amber-700 text-white"
                                                    : "bg-white"
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium">
                                        Variant Images
                                    </span>

                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) =>
                                            uploadVariantImages(e, index)
                                        }
                                        className="mt-1 w-full"
                                    />
                                </label>

                                {variant.images.length > 0 && (
                                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                        {variant.images.map((image) => (
                                            <div
                                                key={image.public_id}
                                                className="relative overflow-hidden rounded-2xl"
                                            >
                                                <img
                                                    src={image.url}
                                                    alt=""
                                                    className="h-28 w-full object-cover"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeVariantImage(
                                                            index,
                                                            image
                                                        )
                                                    }
                                                    className="absolute cursor-pointer hover:text-gray-500 right-2 top-2 rounded-full bg-black/70 px-2 text-white"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addVariant}
                            className="rounded-3xl cursor-pointer hover:bg-amber-200 bg-amber-100 px-5 py-3 font-medium text-amber-800"
                        >
                            + Add Another Color
                        </button>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                type="submit"
                                disabled={submitting || uploading}
                                className="inline-flex items-center cursor-pointer justify-center rounded-3xl bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {submitting
                                    ? "Saving..."
                                    : isEdit
                                        ? "Update Product"
                                        : "Create Product"}
                            </button>
                            {(uploading || submitting) && <p className="text-sm text-zinc-500">Please wait...</p>}
                        </div>
                    </form>
                </div>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
        </div>
    </div>
    );
}


export default Productform
