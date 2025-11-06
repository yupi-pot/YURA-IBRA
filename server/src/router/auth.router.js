const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const cookieConfig = require("../config/cookie.config");
const { Users } = require("../../db/models");
const { where } = require("sequelize");
const jwt = require("jsonwebtoken");

userRouter.get("/", (req, res) => {
  res.json({ message: "ok" });
});

userRouter.post("/register", async (req, res) => {
  try {
    const { login, email, password } = req.body;

    if (!(login && email && password)) {
      return res.status(400).json({ message: "Заполните все поля" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [user, isCreated] = await Users.findOrCreate({
      where: { login },
      defaults: {
        login,
        email,
        password: hashedPassword,
      },
    });

    if (!isCreated) {
      return res.status(409).end();
    }

    const cleanUser = user.get();
    delete cleanUser.password;
    delete cleanUser.createdAt;
    delete cleanUser.updatedAt;

    const { accessToken, refreshToken } = generateToken({ user: cleanUser });

    res
      .cookie("refreshToken", refreshToken, cookieConfig)
      .json({ accessToken, user: cleanUser });
  } catch (error) {
    console.log("ERROR: ", error.message);
    res.status(400).end();
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!(login && password)) {
      return res.status(400).json({ message: "Заполните все поля" });
    }

    const user = await Users.findOne({
      where: { login },
    });

    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(403).json({ message: "Неверный пароль" });
    }

    const cleanUser = user.get();
    delete cleanUser.password;
    delete cleanUser.createdAt;
    delete cleanUser.updatedAt;

    const { accessToken, refreshToken } = generateToken({ user: cleanUser });

    res
      .cookie("refreshToken", refreshToken, cookieConfig)
      .json({ accessToken, user: cleanUser });
  } catch (error) {
    console.log("ERROR: ", error.message);
    res.status(400).end();
  }
});

userRouter.get("/logout", (req, res) => {
  res.clearCookie("refreshToken").status(200).end();
});

module.exports = userRouter;
