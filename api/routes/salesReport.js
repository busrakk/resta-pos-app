const SalesReport= require("../models/SalesReport");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const report = await SalesReport.find();
    res.status(200).json({
      status: "success",
      message: "Sales reports listed successfully",
      data: report,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// ödeme tipine göre listeleme
// nakit or kart
router.get("/:odeme_tipi", async (req, res) => {
  try {
    const odeme_tipi = req.params.odeme_tipi;
    const report = await SalesReport.find({ odeme_tipi: odeme_tipi });
    res.status(200).json({
      status: "success",
      message: "Sales reports listed successfully",
      data: report,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const report = new SalesReport(req.body);
    await report.save();
    res.status(201).json({
      status: "success",
      message: "Sales Report added successfully",
      data: report,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
