import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
    {
        name: String,

        url: {
            type: String,
            required: true,
        },

        public_id: {
            type: String,
            required: true,
        },
    },
);

const VariantSchema = new mongoose.Schema(
    {
        colorName: {
            type: String,
            required: true,
            trim: true,
        },

        inStock: {
            type: Boolean,
            default: true,
            index: true,
        },

        sizes: {
            type: [Number],
            required: true,
            default: [],
        },

        images: {
            type: [ImageSchema],
            default: [],
        },
    },
    { _id: false }
);

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            index: true,
        },

        sku: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },

        description: {
            text: {
                type: String,
                default: "",
            },

            featured: {
                type: [String],
                default: [],
            },
        },

        MRP: {
            type: Number,
            required: true,
            min: 0,
        },

        SP: {
            type: Number,
            required: true,
            min: 0,
            index: true,
        },

        isfeatured: {
            type: Boolean,
            default: false,
            index: true,
        },

        variants: {
            type: [VariantSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// Search
ProductSchema.index({ title: "text" });

// Filters
ProductSchema.index({ category: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ inStock: 1 });
ProductSchema.index({ SP: 1 });

// Homepage
ProductSchema.index({
    category: 1,
    isFeatured: 1,
});

export default mongoose.models.Product ||
    mongoose.model("Product", ProductSchema);