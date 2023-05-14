const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    const { kullanici_adi, kullanici_sifre, kullanici_rol } = req.body;

    if (kullanici_sifre.length < 6) {
      return res.status(400).json({
        status: "error",
        messages: "user Password less than 6 characters",
      });
    }

    // Validate user input
    if (!(kullanici_adi && kullanici_sifre)) {
      res.status(400).json({
        status: "error",
        messages: "Please enter all fields",
      });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ kullanici_adi });

    if (oldUser) {
      return res.status(409).json({
        status: "error",
        messages: "Username already exist. Please Login",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(kullanici_sifre, salt);
    const newUser = new User({
      kullanici_adi,
      kullanici_sifre: hashedPassword,
      kullanici_rol,
      admin: false,
      oto_cikis: false,
      rapor_email: true,
      iade_al: true,
      ikram_et: true,
      odeme_al: true,
      masa_degistir: true,
      urun_tasi: true,
      gun_islemleri: true,
      kasa: true,
      raporlar: true,
      ayarlar: true,
      rezervasyon: true,
    });
    await newUser.save();
    res.status(201).json({
      status: "success",
      messages: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    // Get user input
    const { kullanici_adi, kullanici_sifre, kullanici_rol } = req.body;

    // Validate user input
    if (!(kullanici_adi && kullanici_sifre && kullanici_rol)) {
      res.status(400).json({
        status: "error",
        messages: "Please enter all fields",
      });
    }

    const user = await User.findOne({ kullanici_adi: req.body.kullanici_adi });
    !user &&
      res.status(404).json({
        status: "error",
        messages: "User not found",
      });
    const isMatch = await bcrypt.compare(
      req.body.kullanici_sifre,
      user.kullanici_sifre
    );
    if (!isMatch) {
      res.status(403).json({
        status: "error",
        messages: "Invalid credentials",
      });
    } else {
      res.status(200).json({
        status: "success",
        messages: "User logged in successfully",
        data: user,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

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
