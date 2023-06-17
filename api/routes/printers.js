const Printer = require("../models/Printer.js");
const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const data = new Printer(req.body);
    await data.save();
    res.status(201).json({
      status: "success",
      message: "Printer added successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Printer.find();
    res.status(200).json({
      status: "success",
      message: "Printer listed successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/update", async (req, res) => {
    try {
      const data = await Printer.findByIdAndUpdate({ _id: req.body.dataId }, req.body);
      res.status(200).json({
        status: "success",
        message: "Printer updated successfully",
        data: data,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }); 
  
  router.delete("/delete", async (req, res) => {
    try {
      const data = await Printer.findByIdAndDelete({ _id: req.body.dataId });
      res.status(200).json({
        status: "success",
        message: "Printer deleted successfully",
        data: data,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  });

module.exports = router;
