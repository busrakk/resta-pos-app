const Expense = require("../models/Expense");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ _id: -1 });
    // res.send(expenses)
    res.status(200).json({
      status: "success",
      message: "expenses listed successfully",
      data: expenses,
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
    const tumGelirler = await Expense.find({ odeme_tipi: odeme_tipi });
    res.status(200).json({
      status: "success",
      message: "Expenses listed successfully",
      data: tumGelirler,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json({
      status: "success",
      message: "Expense added successfully",
      data: newExpense,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
