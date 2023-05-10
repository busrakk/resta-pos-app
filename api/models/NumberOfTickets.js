const mongoose = require('mongoose');

const NumberOfTicketsSchema = mongoose.Schema(
    {
        tarih: {type: String, required: true},
    },{
        timestamps: true
    }
)

const NumberOfTickets = mongoose.model("tickets", NumberOfTicketsSchema);
module.exports = NumberOfTickets;