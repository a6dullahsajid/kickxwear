
import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: "",
  },

  phone: {
    type: String,
    trim: true,
    default: "",
  },

  addressLine1: {
    type: String,
    required: true,
    trim: true,
  },

  addressLine2: {
    type: String,
    trim: true,
    default: "",
  },

  city: {
    type: String,
    required: true,
    trim: true,
  },

  state: {
    type: String,
    required: true,
    trim: true,
  },

  postalCode: {
    type: String,
    required: true,
    trim: true,
  },

  country: {
    type: String,
    default: "India",
    trim: true,
  },

  isDefault: {
    type: Boolean,
    default: false,
  },
});

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    addresses: {
      type: [AddressSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Customer =
  mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema);

export default Customer;
