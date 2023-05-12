const mongoose = require("mongoose");

const TablePaymentSchema = mongoose.Schema(
  {
    masa_info: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TableInfo",
    },
    masa_detay_odeme: { type: String, required: true },
    tahsil_edilen: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const TablePayment = mongoose.model("table-payments", TablePaymentSchema);
module.exports = TablePayment;
