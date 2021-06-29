const { Pool } = require("pg");

const pool = new Pool({
  database: "postgres",
  user: "postgres",
  password: "example",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 1000,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
