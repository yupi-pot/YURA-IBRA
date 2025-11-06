const express = require("express");
const indexRouter = express.Router();
const verifyAccessToken = require("../middleware/verifyAccessToken");
const verifyRefreshToken = require("../middleware/verifyRefreshToken");
const userRouter = require("./auth.router");
const tokenRouter = require("./tokens.router");
const generateToken = require("../utils/generateToken");
const notebooksRouter = require("./notebooks.router");
const noteRouter = require("./notes.router");

indexRouter.use("/users", userRouter);

indexRouter.use("/tokens", tokenRouter);

indexRouter.use("/notebooks", notebooksRouter);

indexRouter.use("/notes", noteRouter);

module.exports = indexRouter;
