const MongoClient = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
const config = require("../config");
const fs = require("fs");

const url = config.mongodb_url;
const dbName = config.db_name;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

var _database;

module.exports = {
  connect: function (callback) {
    MongoClient.connect(url, options, function (err, client) {
      if (!err) {
        console.log("Successfully connected to Mongo DB Server.");
        _database = client.db(dbName);
        return callback(true);
      } else {
        console.log("Failed to connect to Mongo DB Server.");
        return callback(false);
      }
    });
  },

  getDatabase: function () {
    return _database;
  },

  initData: function () {
    var init_done = fs.existsSync("./data/mongodb.init.done");

    if (init_done) {
      console.log("Mongo DB data already initialised.");
    } else if (!init_done) {
      console.log(
        "------------------------------------------------------------"
      );
      console.log("Initialising Mongo DB data ...");
      importData();
    }
  },
};

async function importData() {
  let csv_files = fs.readdirSync("./data");
  csv_files = csv_files.filter(
    (file) => file.includes("- Mongo -") && file.includes(".csv")
  );

  let promises = csv_files.map(function (file) {
    return new Promise(function (resolve) {
      csvtojson()
        .fromFile(`./data/${file}`)
        .then((data) => {
          // get table name based on csv file
          // csv file name format must be "{Any} - {Database} - {Table Name}.csv"
          let table_name = file.split("-")[2].split(".")[0].trim();

          _database.collection(table_name).insertMany(data, (err, res) => {
            if (err) throw err;
            resolve(
              `Inserted: (${res.insertedCount}) rows on table ${table_name}`
            );
          });
        });
    });
  });

  Promise.all(promises).then(function (res) {
    console.log(res);
    setImportDataDone();
  });
}

function setImportDataDone() {
  fs.writeFileSync("./data/mongodb.init.done", "");
  console.log("Mongo DB data initialised.");
  console.log("------------------------------------------------------------");
}
