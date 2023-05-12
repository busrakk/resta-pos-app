const Income = require("../models/Income");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const incomes = await Income.find().sort({ _id: -1 });
    // res.send(incomes)
    res.status(200).json({
      status: "success",
      message: "Incomes listed successfully",
      data: incomes,
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
    const tumGelirler = await Income.find({ odeme_tipi: odeme_tipi });
    res.status(200).json({
      status: "success",
      message: "Incomes listed successfully",
      data: tumGelirler,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const newIncome = new Income(req.body);
    await newIncome.save();
    res.status(201).json({
      status: "success",
      message: "Income added successfully",
      data: newIncome,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
