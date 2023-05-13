const mongoose = require('mongoose');

const RestaurantInfoSchema = mongoose.Schema(
    {
        res_adi: {type: String, required: true},
        res_tel_no: {type: String, required: true},
        res_adres: {type: String, required: true},
        res_email: {type: String, required: true},
        para_birimi: {type: String, required: true},
    },{
        timestamps: true
    }
)

const RestaurantInfo = mongoose.model("restaurant-infos", RestaurantInfoSchema);
module.exports = RestaurantInfo;