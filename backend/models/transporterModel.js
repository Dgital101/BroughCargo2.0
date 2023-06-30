import mongoose from "mongoose";

const transporterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    truckType: { type: String },
    priceRange: { type: String },
    location: { type: String },
    phoneNumber: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Transporter = mongoose.model("Transporter", transporterSchema);
export default Transporter;
