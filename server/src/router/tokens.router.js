const express = require("express");
const tokenRouter = express.Router();
const verifyAccessToken = require("../middleware/verifyAccessToken");
const verifyRefreshToken = require("../middleware/verifyRefreshToken");
const cookieConfig = require('../config/cookie.config')
const generateToken = require('../utils/generateToken')

tokenRouter.get("/status", verifyAccessToken, (_, res) => {
  res.json({ message: "ok", uptime: process.uptime() });
});

tokenRouter.get("/refresh", verifyRefreshToken, (req, res) => {
  const { accessToken, refreshToken } = generateToken({
    user: res.locals.user,
  });
  console.log("CHECK");

  res
    .cookie("refreshToken", refreshToken, cookieConfig)
    .json({ accessToken, user: res.locals.user });
});

module.exports = tokenRouter;
