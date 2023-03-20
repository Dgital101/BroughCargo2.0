import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, Unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    sellerID: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
