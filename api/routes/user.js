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
    const kullaniciAdi = req.params.kullanici_adi;

    const data = await User.find({
      kullanici_adi: {
        $regex: ".*" + kullaniciAdi + ".*",
        $options: "i",
      },
    });

    if (data.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Kullanıcı bulunamadı",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Kullanıcı bilgileri başarıyla getirildi",
      data: data,
    });
  } catch (error) {
    console.error("Kullanıcı bilgisi getirme hatası:", error);
    res.status(500).json({
      status: "error",
      message: "Bir hata oluştu",
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
  const userId = req.params.userId;

  try {
    // Kullanıcıyı bul ve sil
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        status: "error",
        message: "Kullanıcı bulunamadı",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Kullanıcı başarıyla silindi",
      deletedUser,
    });
  } catch (error) {
    console.error("Kullanıcı silme hatası:", error);
    res.status(500).json({
      status: "error",
      message: "Bir hata oluştu",
    });
  }
});

module.exports = router;
