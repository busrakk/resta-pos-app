const mongoose = require('mongoose');

const DayTransactionSchema = mongoose.Schema( // gün işlemleri
    {
        gi_tarih: {type: String, required: true},
        gun_acik_mi: {type: String, required: true},
    },{
        timestamps: true
    }
)

const DayTransaction = mongoose.model("day_transactions", DayTransactionSchema);
module.exports = DayTransaction;