const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
    res.locals.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Неверный REFRESH TOKEN" });
  }
};

module.exports = verifyRefreshToken;
