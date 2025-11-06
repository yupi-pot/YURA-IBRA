const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const configureMidleware = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
};

module.exports = configureMidleware;
