const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    masa: { type: mongoose.Schema.Types.ObjectId, ref: "TableInfo" },
    urunler: [
      {
        urun: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        adet: { type: String, required: true },
      },
    ],
    urun_fiyat_toplam: { type: String, required: true },
    alman_adet: { type: String, required: true },
    alman_detay: { type: String, required: true },
    alman_odeme: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("orders", OrderSchema);
module.exports = Order;
