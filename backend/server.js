import express from "express";
import path from "path";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import expressAsyncHandler from "express-async-handler";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();
mongoose

  .connect(
    "mongodb+srv://BroughtCargo:BroughtCargo@cluster0.lcxjdhp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
