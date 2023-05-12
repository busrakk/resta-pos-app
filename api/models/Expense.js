const mongoose = require('mongoose'); 

const ExpenseSchema = mongoose.Schema( // gelir modeli
    {
        aciklama: {type: String, required: true},
        tarih: {type: String, required: true},
        saat: {type: String, required: true},
        odeme_tipi: {type: String, required: true},
        tutar: {type: String, required: true},
    },{
        timestamps: true
    }
)

const Expense = mongoose.model("expenses", ExpenseSchema);
module.exports = Expense;