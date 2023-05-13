const mongoose = require('mongoose');

const SalesReportSchema = mongoose.Schema(
    {
        odeme_tipi: {type: String, required: true},
        fiyat: {type: String, required: true},
        tarih: {type: String, required: true},
    },{
        timestamps: true
    }
)

const SalesReport = mongoose.model("sales_reports", SalesReportSchema);
module.exports = SalesReport;