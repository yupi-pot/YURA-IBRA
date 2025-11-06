const express = require("express");
const app = express();
const configureMidleware = require('./src/config/serverConfig');
const indexRouter = require("./src/router/index.router");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
configureMidleware(app);

app.use("/api", indexRouter);

app.listen(PORT, () => {
  console.log(`Server started on port: `, PORT);
});
