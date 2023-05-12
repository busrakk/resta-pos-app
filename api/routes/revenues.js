const Revenue = require("../models/Revenue");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tickets = await Revenue.find().sort({ _id: -1 });
    // res.send(tickets)
    res.status(200).json({
      status: "success",
      message: "Revenues listed successfully",
      data: tickets,
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
    const tumGelirler = await Revenue.find({ odeme_tipi: odeme_tipi });
    res.status(200).json({
      status: "success",
      message: "Revenues listed successfully",
      data: tumGelirler,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const newRevenue = new Revenue(req.body);
    await newRevenue.save();
    res.status(201).json({
      status: "success",
      message: "Ticket added successfully",
      data: newRevenue,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
