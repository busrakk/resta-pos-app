const RefundAndCancellation = require("../models/RefundAndCancellation");
const Product = require("../models/Product.js");
const Category = require("../models/Category.js");
const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const urun = await Product.findById(req.body.urun);

    if (!urun) {
      return res.status(404).json({
        status: "error",
        messages: error.message,
      });
    }
    const newData = new RefundAndCancellation({
      urun: urun,
      adet: req.body.adet,
      turu: req.body.turu,
      tarih: req.body.tarih,
    });
    await newData.save();
    res.status(201).json({
      status: "success",
      messages: "Product detail added successfully",
      data: newData,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await RefundAndCancellation.find();
    res.status(200).json({
      status: "success",
      messages: "Refund anc cancellation listed successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.get("/:turu", async (req, res) => {
  try {
    const turu = req.params.turu;
    const data = await RefundAndCancellation.find({ turu: turu });
    res.status(200).json({
      status: "success",
      messages: "Data listed successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

module.exports = router;
