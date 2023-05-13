const ProductSalesReport = require("../models/ProductSalesReport");
const Product = require("../models/Product.js");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    const result = [];
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const report = await ProductSalesReport.findOne({
        urun: product._id,
      });
      if (report) {
        result.push({
          _id: product._id,
          urun_adi: product.urun_adi,
          urun_fiyat: product.urun_fiyat,
          adet: report.adet,
          tarih: report.tarih,
        });
      }
    }
    res.status(200).json({
      status: "success",
      messages: "Product sales reports listed successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const urun = await Product.findById(req.body.urun);

    if (!urun) {
      return res.status(404).json({
        status: "error",
        messages: error.message,
      });
    }
    const report = new ProductSalesReport({
      urun: urun,
      adet: req.body.adet,
      tarih: req.body.tarih,
    });
    await report.save();
    res.status(201).json({
      status: "success",
      messages: "Product sales report added successfully",
      data: report,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

module.exports = router;
