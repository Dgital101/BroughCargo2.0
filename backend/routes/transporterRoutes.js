import express from "express";
import bcrypt from "bcryptjs";
import Transporter from "../models/transporterModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";

const transporterRouter = express.Router();

transporterRouter.get(
  "/",

  expressAsyncHandler(async (req, res) => {
    const transporters = await Transporter.find({});
    res.send(transporters);
  })
);

transporterRouter.get(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const transporter = await Transporter.findById(req.params.id);
    if (transporter) {
      res.send(transporter);
    } else {
      res.status(404).send({ message: "Transporter Not Found" });
    }
  })
);

transporterRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const transporter = await Transporter.findById(req.params.id);
    if (transporter) {
      transporter.name = req.body.name || transporter.name;
      transporter.truckType = req.body.truckType || transporter.truckType;
      transporter.priceRange = req.body.priceRange || transporter.priceRange;
      transporter.location = req.body.location || transporter.location;
      transporter.phoneNumber = req.body.phoneNumber || transporter.phoneNumber;

      const updatedTransporter = await transporter.save();
      res.send({
        message: "Transporter Updated",
        transporter: updatedTransporter,
      });
    } else {
      res.status(404).send({ message: "Transporter Not Found" });
    }
  })
);

transporterRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const transporter = await Transporter.findById(req.params.id);
    if (transporter) {
      await transporter.remove();
      res.send({ message: "Transporter Deleted" });
    } else {
      res.status(404).send({ message: "Transporter Not Found" });
    }
  })
);

transporterRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const transporter = await Transporter.findOne({ email: req.body.email });

    if (transporter) {
      if (bcrypt.compareSync(req.body.password, transporter.password)) {
        res.send({
          _id: transporter._id,
          name: transporter.name,
          truckType: transporter.truckType,
          priceRange: transporter.priceRange,
          location: transporter.location,
          phoneNumber: transporter.phoneNumber,
          email: transporter.email,
          isVerified: transporter.isVerified,
          token: generateToken(transporter),
        });

        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

transporterRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newTransporter = new Transporter({
      name: req.body.name,
      truckType: req.body.truckType,
      priceRange: req.body.priceRange,
      location: req.body.location,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const transporter = await newTransporter.save();
    res.send({
      _id: newTransporter._id,
      name: newTransporter.name,
      truckType: newTransporter.truckType,
      priceRange: newTransporter.priceRange,
      location: newTransporter.location,
      phoneNumber: newTransporter.phoneNumber,
      email: newTransporter.email,
      isVerified: newTransporter.isVerified,
      token: generateToken(transporter),
    });
  })
);

transporterRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const transporter = await Transporter.findOne({ email: req.body.email });
    if (transporter) {
      transporter.name = req.body.name || transporter.name;
      transporter.truckType = req.body.truckType || transporter.truckType;
      transporter.priceRange = req.body.priceRange || transporter.priceRange;
      transporter.location = req.body.location || transporter.location;
      transporter.phoneNumber = req.body.phoneNumber || transporter.phoneNumber;
      if (req.body.password) {
        transporter.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedTransporter = await transporter.save();
      res.send({
        _id: updatedTransporter._id,
        name: updatedTransporter.name,
        truckType: updatedTransporter.truckType,
        priceRange: updatedTransporter.priceRange,
        location: updatedTransporter.location,
        phoneNumber: updatedTransporter.phoneNumber,
        email: updatedTransporter.email,
        isVerified: updatedTransporter.isVerified,
        token: generateToken(updatedTransporter),
      });
    } else {
      res.status(404).send({ message: "Transporter not found" });
    }
  })
);

export default transporterRouter;
