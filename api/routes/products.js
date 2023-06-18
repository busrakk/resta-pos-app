const Product = require("../models/Product.js");
const Category = require("../models/Category.js");
const Printer = require("../models/Printer.js");
const express = require("express");
const router = express.Router();

router.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find()
  .populate({
    path: "urun_kategori",
    model: "categories",
  })
  .populate({
    path: "yazici_adi",
    model: "printers",
  });
    res.status(200).json({
      status: "success",
      messages: "Products listed successfully",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.post("/add-product", async (req, res) => {
  try {
    const category = await Category.findById(req.body.urun_kategori);
    const printer = await Printer.findById(req.body.yazici_adi);
    if (!category) {
      res.status(400).json({ message: "Invalid category" });
    } else if(!printer){
      res.status(400).json({ message: "Invalid printer" });
    }
    else {
      const newProduct = new Product({
        urun_adi: req.body.urun_adi,
        urun_kategori: category,
        urun_fiyat: req.body.urun_fiyat,
        urun_detay: req.body.urun_detay,
        yazici_adi: printer,
        kategori_ip: req.body.kategori_ip,
        urun_ip: req.body.urun_ip,
      })
      await newProduct.save();
      res.status(201).json({
        status: "success",
        messages: "Product added successfully",
        data: newProduct,
      });
    }
    // const newProduct = new Product(req.body);
    // await newProduct.save();
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.put("/update-product", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: req.body.productId },
      req.body
    );
    if (!product) {
      res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      messages: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.delete("/delete-product", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete({
      _id: req.body.productId,
    });
    res.status(200).json({
      status: "success",
      messages: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

// products by category
router.get("/get-products-by-category", async (req, res) => {
  try {
    const products = await Product.find({
      urun_kategori: req.body.urun_kategori,
    }).populate({
      path: "urun_kategori",
      model: "categories",
    })
    .populate({
      path: "yazici_adi",
      model: "printers",
    });
    res.status(200).json({
      status: "success",
      messages: "Products listed successfully",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

module.exports = router;
