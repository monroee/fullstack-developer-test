const express = require("express");
const cors = require("cors");
const mongodb = require("./db/mongo.db");
const postgresdb = require("./db/postgres.db");

const app = express();

app.use(cors());

app.listen(8000, () => {
  console.log(`Server running on http://localhost:8000`);
});

mongodb.connect(function (connected) {
    if (connected) {
      mongodb.initData();
    }
});

postgresdb.connect(function(connected) {
    if(connected) {
        postgresdb.initData();
    }
});
