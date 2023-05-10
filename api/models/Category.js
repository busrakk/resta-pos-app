const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema(
    {
        kategori_adi: {type: String, required: true},
    },{
        timestamps: true
    }
)

const Category = mongoose.model("categories", CategorySchema);
module.exports = Category;