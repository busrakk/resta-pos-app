const ProductsDetail = require("../models/ProductsDetail.js");
const Product = require("../models/Product.js");
const Category = require("../models/Category.js");
const Printer = require("../models/Printer.js");
const express = require("express");
const router = express.Router();

router.get("/:urun_adi", async (req, res) => {
  try {
    const products = await Product.find({
      urun_adi: { $regex: ".*" + req.params.urun_adi + ".*", $options: "i" },
    }).sort({ _id: 1 });
    const result = [];
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const category = await Category.findById(product.urun_kategori);
      const printer = await Printer.findById(product.yazici_adi);
      const productDetail = await ProductsDetail.findOne({
        urun: product._id,
      })
      if (productDetail) {
        result.push({
          _id: product._id,
          urun_adi: product.urun_adi,
          urun_kategori: category,
          urun_fiyat: product.urun_fiyat,
          urun_detay: product.urun_detay,
          urun_detay_adi: productDetail.urun_detay_adi,
          urun_detay_fiyat: productDetail.urun_detay_fiyat,
          yazici_adi: printer,
          kategori_ip: product.kategori_ip,
          urun_ip: product.urun_ip,
        });
      } else {
        result.push({
          _id: product._id,
          urun_adi: product.urun_adi,
          urun_kategori: category,
          urun_fiyat: product.urun_fiyat,
          yazici_adi: printer,
          kategori_ip: product.kategori_ip,
          urun_ip: product.urun_ip,
        });
      }
    }
    res.status(200).json({
      status: "success",
      messages: "Products listed successfully",
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
    const newDetail = new ProductsDetail({
      urun: urun,
      urun_detay_adi: req.body.urun_detay_adi,
      urun_detay_fiyat: req.body.urun_detay_fiyat,
    });
    await newDetail.save();
    res.status(201).json({
      status: "success",
      messages: "Product detail added successfully",
      data: newDetail,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.put("/update", async (req, res) => {
  try {
    const detail = await ProductsDetail.findByIdAndUpdate(
      { _id: req.body.detailId },
      req.body
    );
    //await product.save();
    if (!detail) {
      res.status(404).json({
        status: "error",
        message: "Product detail not found",
      });
    }
    res.status(200).json({
      status: "success",
      messages: "Product detail updated successfully",
      data: detail,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const detail = await ProductsDetail.findByIdAndDelete({
      _id: req.body.detailId,
    });
    res.status(200).json({
      status: "success",
      messages: "Product detail deleted successfully",
      data: detail,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

module.exports = router;
