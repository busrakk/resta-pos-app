const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    // product- category relationship
    printer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Printer",
    },
    kategori_adi: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("categories", CategorySchema);
module.exports = Category;
