const OrdersPlaced = require("../models/OrdersPlaced.js");
const Product = require("../models/Product.js");
const TableInfo = require("../models/TableInfo.js");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await OrdersPlaced.find().sort({ _id: 1 }).populate({
      path: "urunler.urun",
      model: "products",
    }).populate({
        path: "masa",
        model: "table-infos",
      });;
    res.status(200).json({
      status: "success",
      messages: "Orders placed listed successfully",
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
    const tables = await TableInfo.find({
      masa_adi: { $regex: ".*" + req.params.masa_adi + ".*", $options: "i" },
    });
    if (!tables) {
      return res.status(404).json({
        status: "error",
        message: "Masa bulunamadı",
      });
    }

    const results = await Promise.all(
      tables.map(async (table) => {
        const order = await OrdersPlaced.findOne({ masa: table._id }).populate({
          path: "urunler.urun",
          model: "products",
        });

        if (order) {
          const urunler = order.urunler.map((urun) => ({
            urun: urun.urun,
            adet: urun.adet,
            urun_adi: urun.urun.urun_adi,
          }));
          return {
            _id: table._id,
            masa_adi: table.masa_adi,
            urunler: urunler, // "urunler" alanındaki verileri ekle
            urun_fiyat_toplam: order.urun_fiyat_toplam,
            alman_adet: order.alman_adet,
            alman_detay: order.alman_detay,
            alman_odeme: order.alman_odeme,
          };
        }
      })
    );
    res.status(200).json({
      status: "success",
      messages: "Orders placed listed successfully",
      //data: result,
      data: results.filter((result) => result !== undefined),
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message || "Error listing orders placed",
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { urunler } = req.body;
    const masa = await TableInfo.findById(req.body.masa);
    if (!masa) {
      return res.status(400).json({
        status: "error",
        message: "Order not found",
      });
    }

    // Siparişi oluştur
    const order = new OrdersPlaced({
      masa: masa,
      urunler: urunler.map((urun) => ({
        urun: urun.urun,
        adet: urun.adet,
      })),
      urun_fiyat_toplam: req.body.urun_fiyat_toplam,
      alman_adet: req.body.alman_adet,
      alman_detay: req.body.alman_detay,
      alman_odeme: req.body.alman_odeme,
    });

    await order.save();
    res.status(201).json({
      status: "success",
      messages: "Order placed added successfully",
      data: order,
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
    const order = await OrdersPlaced.findById({ _id: req.body.orderId });
    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Sipariş bulunamadı",
      });
    }
    const { urunler, urun_fiyat_toplam, alman_adet, alman_detay, alman_odeme } =
      req.body;

    // Masa güncellenirse, siparişteki masa da güncellenmeli
    if (req.body.masa) {
      const masa = await TableInfo.findById(req.body.masa);
      if (!masa) {
        return res.status(400).json({
          status: "error",
          message: "Masa bulunamadı",
        });
      }
      order.masa = masa;
    }

    // Siparişteki ürünlerin güncellenmesi
    if (urunler) {
      order.urunler = urunler.map((urun) => ({
        urun: urun.urun,
        adet: urun.adet,
      }));
    }

    // Toplam ürün fiyatının güncellenmesi
    if (urun_fiyat_toplam) {
      order.urun_fiyat_toplam = urun_fiyat_toplam;
    }

    // Alman adetin güncellenmesi
    if (alman_adet) {
      order.alman_adet = alman_adet;
    }

    // Alman detayın güncellenmesi
    if (alman_detay) {
      order.alman_detay = alman_detay;
    }

    // Alman ödemenin güncellenmesi
    if (alman_odeme) {
      order.alman_odeme = alman_odeme;
    }
    await order.save();
    res.status(200).json({
      status: "success",
      messages: "Order placed updated successfully",
      data: order,
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
    const order = await OrdersPlaced.findByIdAndDelete({
      _id: req.body.orderId,
    });
    res.status(200).json({
      status: "success",
      messages: "Order placed deleted successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

module.exports = router;
