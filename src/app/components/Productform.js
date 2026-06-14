"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const initialFormState = {
    title: "",
    category: "",
    description: "",
    featuredTags: "",
    MRP: "",
    SP: "",
    inStock: true,
    featured: false,
};

const Productform = ({ onClose, onSuccess }) => {
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

    const handleFileChange = async (event) => {
        const files = Array.from(event.target.files || []);
        if (!files.length) {
            return;
        }

        setUploading(true);

        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("/api/media", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Image upload failed");
                }

                const result = await response.json();

                setImages((prev) => [
                    ...prev,
                    {
                        id: `${file.name}-${Date.now()}`,
                        name: file.name,
                        url: result.secure_url,
                        public_id: result.public_id,
                    },
                ]);
                toast.success(`${file.name} uploaded successfully`);
            } catch (error) {
                toast.error(`Upload failed: ${error.message}`);
            }
        }

        setUploading(false);
        event.target.value = "";
    };

    const removeImage = async (image) => {
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
                throw new Error(result.message || "Failed to delete image");
            }

            setImages((prev) =>
                prev.filter((img) => img.id !== image.id)
            );

            toast.success("Image deleted");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!images.length) {
            toast.warning("Please upload at least one image before submitting.");
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
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                },
                MRP: Number(formState.MRP),
                SP: Number(formState.SP),
                inStock: formState.inStock,
                featured: formState.featured,
                images: images,
            };

            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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

    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-full max-w-4xl rounded-3xl bg-white p-8 max-h-[90vh] overflow-y-auto">
            <div className="mb-4 flex justify-between">
                <h2 className="text-2xl font-bold">
                    Add Product
                </h2>

                <button
                    onClick={onClose}
                    className="text-2xl"
                >
                    ×
                </button>
            </div>
            <div className="min-h-screen bg-zinc-50 text-amber-900 py-10 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl">
                    <h1 className="text-3xl font-bold mb-4">Add New Product</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
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
                            <span className="text-sm font-medium">Featured tags</span>
                            <input
                                name="featuredTags"
                                value={formState.featuredTags}
                                onChange={handleChange}
                                placeholder="comma separated"
                                className="mt-1 block w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                            />
                        </label>

                        <div className="grid gap-6 sm:grid-cols-2">
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
                            <label className="flex items-center gap-3">
                                <input
                                    name="inStock"
                                    type="checkbox"
                                    checked={formState.inStock}
                                    onChange={handleChange}
                                    className="h-5 w-5 rounded border-zinc-300 text-amber-600 focus:ring-amber-500"
                                />
                                <span className="text-sm">In stock</span>
                            </label>

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

                        <label className="block">
                            <span className="text-sm font-medium">Product images</span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="mt-1 block w-full text-sm text-zinc-700 file:rounded-3xl file:border-0 file:bg-amber-100 file:px-4 file:py-2 file:text-amber-800"
                            />
                        </label>

                        {images.length > 0 && (
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {images.map((image) => (
                                    <div key={image.id} className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50">
                                        <img src={image.url} alt={image.name} className="h-32 w-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(image)}
                                            className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                type="submit"
                                disabled={submitting || uploading}
                                className="inline-flex items-center justify-center rounded-3xl bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {submitting ? "Saving..." : "Create product"}
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
