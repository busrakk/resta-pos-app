const mongoose = require("mongoose");

const RefundAndCancellationSchema = mongoose.Schema( // iadeler ve iptaller
  {
    urun: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    adet: { type: String, required: true },
    turu: { type: String, required: true },
    tarih: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const RefundAndCancellation = mongoose.model("refund_and_cancellation", RefundAndCancellationSchema);
module.exports = RefundAndCancellation;