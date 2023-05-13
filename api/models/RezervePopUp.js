const mongoose = require("mongoose");

const RezervePopUpSchema = mongoose.Schema(
  {
    musteri_adi: { type: String, required: true },
    musteri_tel_no: { type: String, required: true },
    uuid: { type: String, required: true },
    masa: { type: mongoose.Schema.Types.ObjectId, ref: "TableInfo" },
  },
  {
    timestamps: true,
  }
);

const RezervePopUp = mongoose.model("rezerve-popups", RezervePopUpSchema);
module.exports = RezervePopUp;
