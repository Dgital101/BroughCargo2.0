import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, Unique: true },
    slug: { type: String, required: true, Unique: true },
    Image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    Description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    sellerID: { type: String, required: true },
    rating: { type: Number, default: 5 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
