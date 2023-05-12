const TableInfo = require("../models/TableInfo");
const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const info = new TableInfo(req.body);
    await info.save();
    res.status(201).json({
      status: "success",
      message: "Category added successfully",
      data: info,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}); 

router.get("/", async (req, res) => {
  try {
    const info = await TableInfo.find();
    res.status(200).json({
      status: "success",
      message: "Table info listed successfully",
      data: info,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}); 

router.get("/:masa_adi", async (req, res) => {
    try {
      const masa_adi = req.params.masa_adi;
      const data = await TableInfo.find({ masa_adi: masa_adi });
      res.status(200).json({
        status: "success",
        messages: `${masa_adi} listed successfully`,
        data: data,
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
    const info = await TableInfo.findByIdAndUpdate({ _id: req.body.infoId }, req.body);
    res.status(200).json({
      status: "success",
      message: "Table info updated successfully",
      data: info,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}); 

router.delete("/delete", async (req, res) => {
  try {
    const info = await TableInfo.findByIdAndDelete({ _id: req.body.infoId });
    res.status(200).json({
      status: "success",
      message: "Table info deleted successfully",
      data: info,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;