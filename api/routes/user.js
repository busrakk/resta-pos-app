const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  try {
    const data = await User.find().sort({ _id: 1 });
    res.status(200).json({
      status: "success",
      messages: "Users listed successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.get("/:kullanici_adi", async (req, res) => {
  try {
    const data = await User.find({
      kullanici_adi: {
        $regex: ".*" + req.params.kullanici_adi + ".*",
        $options: "i",
      },
    });
    res.status(200).json({
      status: "success",
      messages: "User updated successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.put("/update/:kullanici_adi", async (req, res) => {
  try {
    const user = await User.findOne({
      kullanici_adi: {
        $regex: req.params.kullanici_adi,
        $options: "i",
      },
    });
    const {
      kullanici_adi,
      kullanici_sifre,
      kullanici_rol,
      admin,
      oto_cikis,
      rapor_email,
      iade_al,
      ikram_et,
      odeme_al,
      masa_degistir,
      urun_tasi,
      gun_islemleri,
      kasa,
      raporlar,
      ayarlar,
      rezervasyon,
    } = req.body;
    if (!user) {
      res.status(404).json({
        status: "error",
        messages: "User not found",
      });
    }

    // Şifre güncelleme işlemi
    if (kullanici_sifre) {
      const salt = await bcrypt.genSalt(10);
      user.kullanici_sifre = await bcrypt.hash(kullanici_sifre, salt);
    }

    // Diğer kullanıcı bilgilerinin güncellenmesi
    user.kullanici_adi = kullanici_adi;
    user.kullanici_rol = kullanici_rol;
    user.admin = admin;
    user.oto_cikis = oto_cikis;
    user.rapor_email = rapor_email;
    user.iade_al = iade_al;
    user.ikram_et = ikram_et;
    user.odeme_al = odeme_al;
    user.masa_degistir = masa_degistir;
    user.urun_tasi = urun_tasi;
    user.gun_islemleri = gun_islemleri;
    user.kasa = kasa;
    user.raporlar = raporlar;
    user.ayarlar = ayarlar;
    user.rezervasyon = rezervasyon;

    await user.save();
    res.status(200).json({
      status: "success",
      messages: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.delete("/delete/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send("Kullanıcı bulunamadı.");
    }

    return res.status(200).json({
      status: "success",
      messages: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Bir hata oluştu.");
  }
});

module.exports = router;
