const mongoose = require("mongoose");

const TableInfoSchema = mongoose.Schema(
  {
    masa_adi: { type: String, required: true },
    masa_durumu: { type: String, required: true },
    masa_saat: { type: String, required: true },
    masa_tarih: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const TableInfo = mongoose.model("table-infos", TableInfoSchema);
module.exports = TableInfo;