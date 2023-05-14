const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    kullanici_adi: { type: String, required: true, unique: true },
    kullanici_sifre: { type: String, required: true },
    kullanici_rol: { type: String, required: true },
    admin: { type: String, required: true},
    oto_cikis: { type: String, required: true},
    rapor_email: { type: String, required: true},
    iade_al: { type: String, required: true},
    ikram_et: { type: String, required: true},
    odeme_al: { type: String, required: true},
    masa_degistir: { type: String, required: true},
    urun_tasi: { type: String, required: true},
    gun_islemleri: { type: String, required: true},
    kasa: { type: String, required: true},
    raporlar: { type: String, required: true},
    ayarlar: { type: String, required: true},
    rezervasyon: { type: String, required: true},
  },
  { timestamps: true }
);
const User = mongoose.model("users", UserSchema);
module.exports = User;