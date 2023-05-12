const mongoose = require("mongoose");

const ProductsDetailSchema = mongoose.Schema(
  {
    urun: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    // urun_adi: { type: String, required: true },
    urun_detay_adi: { type: String, required: true },
    urun_detay_fiyat: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductsDetail = mongoose.model("products-detail", ProductsDetailSchema);
module.exports = ProductsDetail;