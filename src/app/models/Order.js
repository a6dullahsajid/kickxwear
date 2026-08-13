import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    product: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      title: { type: String },
      sku: { type: String },
      category: { type: String },
    },

    variant: {
      colorName: { type: String },
      size: { type: mongoose.Schema.Types.Mixed },
    },

    price: { type: Number },
    quantity: { type: Number, default: 1 },

      whatsappLink: { type: String },

      status: {
        type: String,
        enum: ["pending", "processed", "cancelled"],
        default: "pending",
        index: true,
      },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
