const Reservation = require("../models/Reservation");
const TableInfo = require("../models/TableInfo");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const infos = await TableInfo.find();
    const result = [];
    for (let i = 0; i < infos.length; i++) {
      const info = infos[i];
      const reservation = await Reservation.findOne({
        masa: info._id,
      });
      if (reservation) {
        result.push({
          _id: info._id,
          masa_adi: info.masa_adi,
          masa_durumu: info.masa_durumu,
          masa_saat: info.masa_saat,
          masa_tarih: info.masa_tarih,
          musteri_adi: reservation.musteri_adi,
          musteri_tel_no: reservation.musteri_tel_no,
          uuid: reservation.uuid,
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
      const reservation = await Reservation.findOne({
        masa: info._id,
      });
      if (reservation) {
        result.push({
          _id: info._id,
          masa_adi: info.masa_adi,
          masa_durumu: info.masa_durumu,
          masa_saat: info.masa_saat,
          masa_tarih: info.masa_tarih,
          musteri_adi: reservation.musteri_adi,
          musteri_tel_no: reservation.musteri_tel_no,
          uuid: reservation.uuid,
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

router.get("/:masa_tarih/:masa_adi", async (req, res) => {
  try {
    const infos = await TableInfo.find({
      masa_tarih: {
        $regex: ".*" + req.params.masa_tarih + ".*",
        $options: "i",
      },
      masa_adi: {
        $regex: ".*" + req.params.masa_adi + ".*",
        $options: "i",
      },
    });
    const result = [];
    for (let i = 0; i < infos.length; i++) {
      const info = infos[i];
      const reservation = await Reservation.findOne({
        masa: info._id,
      });
      if (reservation) {
        result.push({
          _id: info._id,
          masa_adi: info.masa_adi,
          masa_durumu: info.masa_durumu,
          masa_saat: info.masa_saat,
          masa_tarih: info.masa_tarih,
          musteri_adi: reservation.musteri_adi,
          musteri_tel_no: reservation.musteri_tel_no,
          uuid: reservation.uuid,
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
      const data = new Reservation({
        masa: masa,
        musteri_adi: req.body.musteri_adi,
        musteri_tel_no: req.body.musteri_tel_no,
        uuid: req.body.uuid,
      });
      await data.save();
      res.status(201).json({
        status: "success",
        messages: "Reservation added successfully",
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
    const reservation = await Reservation.findByIdAndUpdate(
      { _id: req.body.reservationId },
      req.body
    );
    //await product.save();
    if (!reservation) {
      res.status(404).json({
        status: "error",
        message: "Product detail not found",
      });
    }
    res.status(200).json({
      status: "success",
      messages: "Product detail updated successfully",
      data: reservation,
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
    const reservation = await Reservation.findByIdAndDelete({
      _id: req.body.reservationId,
    });
    res.status(200).json({
      status: "success",
      messages: "Reservation deleted successfully",
      data: reservation,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

module.exports = router;
