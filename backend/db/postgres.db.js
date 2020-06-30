const { Pool } = require("pg");
const fastcsv = require("fast-csv");
const config = require("../config");
const fs = require("fs");
const { on } = require("process");

const dbName = config.db_name;
// default connection string to create the database for this application
const url_ini = config.postgresdb_url_ini;
// connection string for this database application
const url = config.postgres_url + dbName;

var pool = null;
module.exports = {
  connect: function (callback) {
    pool = new Pool({ connectionString: url_ini });

    pool.connect((err) => {
      if (!err) {
        pool.query(`CREATE DATABASE ${dbName}`, function () {
          pool.end();

          // set connection to the database for this application
          pool = new Pool({ connectionString: url });
          pool.connect(() => {
            console.log("Successfully connected to Postgres DB Server.");
            pool.end();
            return callback(true);
          });
        });
      } else {
        console.log("Failed to connect to Postgres DB Server.");
        return callback(false);
      }
    });
  },

  initData: function () {
    var init_done = fs.existsSync("./data/postgresdb.init.done");

    if (init_done) {
      console.log("Postgres DB data already initialised.");
    } else if (!init_done) {
      console.log(
        "------------------------------------------------------------"
      );
      console.log("Initialising Postgres DB data ...");
      importData();
    }
  },
};

async function importData() {
  let csv_files = fs.readdirSync("./data");
  csv_files = csv_files.filter(
    (file) => file.includes("- Postgres -") && file.includes(".csv")
  );

  pool = new Pool({ connectionString: url });

  let promises = csv_files.map(function (file) {
    return new Promise(function (resolve) {
      let stream = fs.createReadStream(`./data/${file}`);
      let csvData = [];

      let csvStream = fastcsv
        .parse()
        .on("data", function (data) {
          csvData.push(data);
        })
        .on("end", function () {
          // get table name based on csv file
          // csv file name format must be "{Any} - {Database} - {Table Name}.csv"
          var table_name = file.split("-")[2].split(".")[0].trim();

          var columns = csvData.shift();
          var column_values = columns.slice();
          var column_table_and_types = columns.slice();

          // set param for insert query
          column_values.forEach(function (value, i) {
            column_values[i] = `$${i + 1}`;
          });

          // set column data types for table creation
          column_table_and_types.forEach(function (value, i) {
            if (i == 0) {
              column_table_and_types[i] =
                column_table_and_types[i] + " integer PRIMARY KEY";
            } else {
              column_table_and_types[i] =
                column_table_and_types[i] + " VARCHAR(255)";
            }
          });

          column_values = column_values.join();
          columns = columns.join();
          column_table_and_types = column_table_and_types.join();

          var query = `INSERT INTO ${table_name} (${columns}) VALUES (${column_values})`;
          var create_table_query = `CREATE TABLE IF NOT EXISTS ${table_name} (${column_table_and_types})`;

          pool.connect((err, client, done) => {
            if (err) throw err;
            try {
              pool.query(create_table_query, (err, res) => {
                if (err) throw err;
                csvData.forEach((row) => {
                  pool.query(query, row, (err, res) => {
                    if (err) throw err;
                    resolve(
                      `Inserted: (${csvData.length}) rows on table ${table_name}`
                    );
                  });
                });
              });
            } finally {
              done();
            }
          });
        });
      stream.pipe(csvStream);
    });
  });
  Promise.all(promises).then(function (res) {
    console.log(res);
    setImportDataDone();
  });
}

function setImportDataDone() {
  fs.writeFileSync("./data/postgresdb.init.done", "");
  console.log("Postgres DB data initialised.");
  console.log("------------------------------------------------------------");
}
