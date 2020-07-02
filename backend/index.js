const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongodb = require("./db/mongo.db");
const postgresdb = require("./db/postgres.db");
const createError = require("http-errors");

const route = require("./routes/route");
const mongoDBRoute = require("./routes/mongodb.route");
const postgresDBRoute = require("./routes/postgres.route");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/data", route);
app.use("/mongodb", mongoDBRoute);
app.use("/postgresdb", postgresDBRoute);

var isInTest = typeof global.it === "function";

var server = app.listen(8000, () => {
  console.log(`Server listening on http://localhost:8000`);
});

// FIND 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// ERROR HANDLER
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;

  mongodb.connect(function (connected) {
    if (connected) {
      if (!isInTest) mongodb.initData();
    }
  });

  postgresdb.connect(function (connected) {
    if (connected) {
      if (!isInTest) postgresdb.initData();
    }
  });