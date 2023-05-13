const TableInfo = require("../models/TableInfo");
const RezervePopup = require("../models/RezervePopUp");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const infos = await TableInfo.find();
    const result = [];
    for (let i = 0; i < infos.length; i++) {
      const info = infos[i];
      const rezerve = await RezervePopup.findOne({
        masa: info._id,
      });
      if (rezerve) {
        result.push({
          _id: info._id,
          masa_adi: info.masa_adi,
          masa_durumu: info.masa_durumu,
          masa_saat: info.masa_saat,
          masa_tarih: info.masa_tarih,
          musteri_adi: rezerve.musteri_adi,
          musteri_tel_no: rezerve.musteri_tel_no,
          uuid: rezerve.uuid,
        });
      }
    }
    res.status(200).json({
      status: "success",
      messages: "Rezerves listed successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.get("/:masa_tarih", async (req, res) => {
  try {
    const infos = await TableInfo.find({
      masa_tarih: {
        $regex: ".*" + req.params.masa_tarih + ".*",
        $options: "i",
      },
    });
    const result = [];
    for (let i = 0; i < infos.length; i++) {
      const info = infos[i];
      const rezerve = await RezervePopup.findOne({
        masa: info._id,
      });
      if (rezerve) {
        result.push({
          _id: info._id,
          masa_adi: info.masa_adi,
          masa_durumu: info.masa_durumu,
          masa_saat: info.masa_saat,
          masa_tarih: info.masa_tarih,
          musteri_adi: rezerve.musteri_adi,
          musteri_tel_no: rezerve.musteri_tel_no,
          uuid: rezerve.uuid,
        });
      }
    }
    res.status(200).json({
      status: "success",
      messages: "Reservations listed successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.get("/:uuid", async (req, res) => {
  try {
    const reservation = await Reservation.find({
      uuid: req.params.uuid,
    });

    if (!reservation) {
      return res.status(404).json({
        status: "error",
        messages: error.message,
      });
    }

    res.status(200).json({
      status: "success",
      messages: "Reservations listed successfully",
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
    const masa = await TableInfo.findById(req.body.masa);

    if (!masa) {
      return res.status(404).json({
        status: "error",
        messages: error.message,
      });
    }
    if (masa && masa.masa_durumu === "0") {
      const data = new RezervePopup({
        masa: masa,
        musteri_adi: req.body.musteri_adi,
        musteri_tel_no: req.body.musteri_tel_no,
        uuid: req.body.uuid,
      });
      await data.save();
      res.status(201).json({
        status: "success",
        messages: "RezervePopup added successfully",
        data: data,
      });
    } else {
      res.status(400).json({
        status: "error",
        messages: "Masa is not available",
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
    const rezerve = await RezervePopup.findByIdAndUpdate(
      { _id: req.body.rezerveId },
      req.body
    );
    if (!rezerve) {
      res.status(404).json({
        status: "error",
        message: "Rezerve detail not found",
      });
    }
    res.status(200).json({
      status: "success",
      messages: "Rezerve detail updated successfully",
      data: rezerve,
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
    const rezerve = await RezervePopup.findByIdAndDelete({
      _id: req.body.rezerveId,
    });
    res.status(200).json({
      status: "success",
      messages: "rezerve deleted successfully",
      data: rezerve,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

module.exports = router;
