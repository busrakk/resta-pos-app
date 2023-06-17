const Category = require("../models/Category.js");
const Printer = require("../models/Printer.js");
const express = require("express");
const router = express.Router();

router.post("/add-category", async (req, res) => {
  try {
    const printer = await Printer.findById(req.body.printer);
    if (!printer) {
      res.status(400).json({ message: "Invalid printer" });
    } else {
      const newCategory = new Category({
        kategori_adi: req.body.kategori_adi,
        printer: printer,
      });
      await newCategory.save();
      res.status(201).json({
        status: "success",
        messages: "Category added successfully",
        data: newCategory,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
}); // create category

router.get("/get-categories", async (req, res) => {
  try {
    const categories = await Category.find().populate({
      path: "printer",
      model: "printers",
    });
    res.status(200).json({
      status: "success",
      message: "Categories listed successfully",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
}); // get all categories

router.put("/update-category", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      { _id: req.body.categoryId },
      req.body
    );
    if (!category) {
      res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
}); // update category

router.delete("/delete-category", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete({
      _id: req.body.categoryId,
    });
    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
}); // delete category

module.exports = router;
