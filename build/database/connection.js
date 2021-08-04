"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require("pg"),
    Pool = _require.Pool;

var pool = new Pool({
  database: "postgres",
  user: "postgres",
  password: "example",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 1000
});
var db = {
  query: function query(text, params) {
    return pool.query(text, params);
  }
};
var _default = db;
exports["default"] = _default;
//# sourceMappingURL=connection.js.map