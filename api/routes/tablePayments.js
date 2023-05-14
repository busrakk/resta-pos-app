const TableInfo = require("../models/TableInfo");
const TablePayment = require("../models/TablePayment");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await TablePayment.find().populate({
      path: "masa_info",
      model: "table-infos",
    });
    res.status(200).json({
      status: "success",
      messages: "Table payment listed successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.get("/:masa_adi", async (req, res) => {
    try {
      const infos = await TableInfo.find({
        masa_adi: { $regex: req.params.masa_adi, $options: "i" },
      });
      const result = [];
      for (let i = 0; i < infos.length; i++) {
        const info = infos[i];
        const payment = await TablePayment.findOne({masa_info: info._id})
        if (payment) {
          result.push({
            _id: info._id,
            masa_adi: info.masa_adi,
            masa_durumu: info.masa_durumu,
            masa_saat: info.masa_saat,
            masa_tarih: info.masa_tarih,
            masa_detay_odeme: payment.masa_detay_odeme,
            tahsil_edilen: payment.tahsil_edilen,
          });
        } else {
          result.push({
            _id: info._id,
            masa_adi: info.masa_adi,
            masa_durumu: info.masa_durumu,
            masa_saat: info.masa_saat,
            masa_tarih: info.masa_tarih,
          });
        }
      }
      res.status(200).json({
        status: "success",
        messages: `${infos.masa_adi} information listed successfully`,
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        messages: error.message,
      });
    }
  });

router.post("/add", async (req, res) => {
  try {
    const info = await TableInfo.findById(req.body.masa_info);
    if (!info) {
      res.status(400).json({ message: "Invalid info" });
    } else {
      const newPayment = new TablePayment({
        masa_info: info,
        masa_detay_odeme: req.body.masa_detay_odeme,
        tahsil_edilen: req.body.tahsil_edilen,
      });
      await newPayment.save();
      res.status(201).json({
        status: "success",
        messages: "Table payment added successfully",
        data: newPayment,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.put("/update", async (req, res) => {
  try {
    const data = await TablePayment.findByIdAndUpdate(
      { _id: req.body.dataId },
      req.body
    );
    if (!data) {
      res.status(404).json({
        status: "error",
        message: "data not found",
      });
    }
    res.status(200).json({
      status: "success",
      messages: "Table payment updated successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const data = await TablePayment.findByIdAndDelete({
      _id: req.body.dataId,
    });
    res.status(200).json({
      status: "success",
      messages: "Table payment deleted successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

module.exports = router;
