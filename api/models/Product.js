const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    // product- category relationship
    urun_kategori: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    urun_adi: { type: String, required: true },
    urun_fiyat: { type: String, required: true },
    urun_detay: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;
