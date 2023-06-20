// Bu middleware, gelen isteğin "authorization" başlığında bir JWT bulunup bulunmadığını kontrol eder.

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  // const token = req.headers["authorization"];
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = await User.findById(jwt.verify(token, process.env.JWT_SECRET_KEY).userId);

    next();
  } catch (error) {
    return res.status(403).json({
      status: "error",
      message: "Invalid token",
    });
  }
};

const checkRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.kullanici_rol;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Yetkisiz erişim" });
    }

    next();
  };
};

module.exports = { verifyToken, checkRole };
