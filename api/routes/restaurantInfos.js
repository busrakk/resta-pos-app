const RestaurantInfo = require("../models/RestaurantInfo");
const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const data = new RestaurantInfo(req.body);
    await data.save();
    res.status(201).json({
      status: "success",
      message: "Restaurant Info added successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await RestaurantInfo.find();
    res.status(200).json({
      status: "success",
      message: "Restaurant Info listed successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
