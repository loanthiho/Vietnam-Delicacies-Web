const express = require("express");
const runRouters = require("./routes");
const { Dependencies } = require("./utils/dependencies");
const app = express();

Dependencies(app);
runRouters(app);

module.exports = app;
