const DayTransaction = require("../models/DayTransaction.js");
const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newTransaction = new DayTransaction(req.body);
    await newTransaction.save();
    res.status(201).json({
      status: "success",
      message: "Transaction added successfully",
      data: newTransaction,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const transactions = await DayTransaction.find().sort({ _id: -1 }).limit(1);
    // res.send(transactions)
    res.status(200).json({
      status: "success",
      message: "Day transactions listed successfully",
      data: transactions,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/update", async (req, res) => {
  try {
    const transaction = await DayTransaction.findByIdAndUpdate(
      { _id: req.body.transactionId },
      req.body
    );
    res.status(200).json({
      status: "success",
      message: "Day transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
