"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var newToken = function newToken(args) {
  return _jsonwebtoken["default"].sign(args, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "1h"
  });
};

var verifyToken = function verifyToken(token) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, function (err, payload) {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

var Tokens = {
  newToken: newToken,
  verifyToken: verifyToken
};
var _default = Tokens;
exports["default"] = _default;
//# sourceMappingURL=tokens.js.map