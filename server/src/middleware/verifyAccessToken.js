const jwt = require("jsonwebtoken");
require('dotenv').config()

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const { user } = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
    res.locals.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: "Неверный ACCESS TOKEN" });
  }
};

module.exports = verifyAccessToken;
