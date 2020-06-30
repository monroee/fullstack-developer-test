const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    env: process.env.NODE_ENV,
    db_name: process.env.DATABASE_NAME,
    mongodb_url: process.env.MONGODB_URL,
    postgres_url: process.env.POSTGRESDB_URL,
    postgresdb_url_ini: process.env.POSTGRESDB_URL_INI
  }