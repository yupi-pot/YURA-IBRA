const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");
require("dotenv").config();

const generateToken = (payload) => {
  return {
    accessToken: jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: jwtConfig.access,
    }),
    refreshToken: jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: jwtConfig.refresh,
    }),
  };
};

module.exports = generateToken;
