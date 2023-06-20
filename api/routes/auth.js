const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    const { kullanici_adi, kullanici_sifre } = req.body;

    // Validate user input
    if (!(kullanici_adi && kullanici_sifre)) {
      res.status(400).json({
        status: "error",
        messages: "Please enter all fields",
      });
    }

    const user = await User.findOne({ kullanici_adi });
    if (!user) {
      return res.status(404).json({
        status: "error",
        messages: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(kullanici_sifre, user.kullanici_sifre);
    if (!isMatch) {
      return res.status(403).json({
        status: "error",
        messages: "Invalid credentials",
      });
    }
    // const token = jwt.sign({ userId: user._id }, jwtSecretKey);
    //res.status(200).json({ token });
    res.status(200).json({
      user,
      token: createToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      messages: error.message,
    });
  }
});


const createToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};


module.exports = router;
