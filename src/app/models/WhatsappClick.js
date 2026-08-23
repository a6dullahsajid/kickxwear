import mongoose from "mongoose";

const WhatsappClickSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      enum: ["homepage-hero", "homepage-cta"],
      index: true,
    },
    page: {
      type: String,
      required: true,
      default: "/",
    },
    referrer: {
      type: String,
      default: "",
    },
    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default
  mongoose.models.WhatsappClick ||
  mongoose.model("WhatsappClick", WhatsappClickSchema);
