import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
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
        },

        SP: {
            type: Number,
            required: true,
        },
        inStock: {
            type: Boolean,
            default: true
        },
        featured: {
            type: Boolean,
            default: false,
        },

        images: {
  type: [
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  ],
  default: [],
},
    },
    { timestamps: true }
);

// Search by title
ProductSchema.index({ title: "text" });

// Common filters
ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ inStock: 1 });
ProductSchema.index({ SP: 1 });

// Homepage queries
ProductSchema.index({
    category: 1,
    featured: 1,
});

export default mongoose.models.Product ||
    mongoose.model("Product", ProductSchema);