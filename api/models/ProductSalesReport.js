const mongoose = require("mongoose");

const ProductSalesReportSchema = mongoose.Schema(
  {
    adet: { type: String, required: true },
    urun: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    tarih: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductSalesReport = mongoose.model(
  "product-sales_reports",
  ProductSalesReportSchema
);
module.exports = ProductSalesReport;
