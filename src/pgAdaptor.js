require("dotenv").config();
const pgPromise = require("pg-promise");
const pgp = pgPromise({});

const config = {
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
};

const db = pgp(config);
const update = pgp.helpers.update;

module.exports = {
  db,
  update,
};
