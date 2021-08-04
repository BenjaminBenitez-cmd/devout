"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var state = process.env.NODE_ENV;

var config = function config(state) {
  var _ref;

  switch (state) {
    case "development":
      return _ref = {
        PGUSER: process.env.PGDATABASE,
        PGPORT: process.env.PGPORT
      }, (0, _defineProperty2["default"])(_ref, "PGUSER", process.env.PGUSER), (0, _defineProperty2["default"])(_ref, "PGPASSWORD", process.env.PGPASSWORD), (0, _defineProperty2["default"])(_ref, "JWT_EXPIRY", process.env.JWT_EXPIRY), (0, _defineProperty2["default"])(_ref, "JWT_SECRET", process.env.JWT_SECRET), (0, _defineProperty2["default"])(_ref, "STRIPE_KEY", process.env.STRIPE_KEY), (0, _defineProperty2["default"])(_ref, "SENDGRID_API_KEY", process.env.SENDGRID_API_KEY), (0, _defineProperty2["default"])(_ref, "SENDER_EMAIL", process.env.SENDER_EMAIL), _ref;

    case "production":
      return {
        PGCONNECTION: process.env.DATABASE_URL,
        JWT_EXPIRY: process.env.JWT_EXPIRY,
        JWT_SECRET: process.env.JWT_SECRET,
        STRIPE_KEY: process.env.STRIPE_KEY,
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
        SENDER_EMAIL: process.env.SENDER_EMAIL
      };

    default:
      return;
  }
};

var _default = config(state);

exports["default"] = _default;
//# sourceMappingURL=config.js.map