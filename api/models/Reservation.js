const mongoose = require("mongoose");

const ReservationSchema = mongoose.Schema(
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

const Reservation = mongoose.model("reservations", ReservationSchema);
module.exports = Reservation;
