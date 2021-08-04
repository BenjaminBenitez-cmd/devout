"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var Users = {};

Users.getOneByID = function (id) {
  return _connection["default"].query("SELECT * FROM Users WHERE UserID = $1", [id]);
};

Users.getOneByEmail = function (email) {
  return _connection["default"].query("SELECT * FROM Users WHERE UserEmail = $1 AND UserPassword IS NOT NULL", [email]);
};

Users.createOne = function (email, firstname, lastname, password) {
  return _connection["default"].query("INSERT INTO Users(UserEmail, UserFirstName, UserLastName, UserPassword) VALUES ($1, $2, $3, $4) returning*", [email, firstname, lastname, password]);
};

Users.updateOne = function (id, firstname, lastname, emailverified, verificationcode) {
  return _connection["default"].query("UPDATE Users SET UserFirstName = $1, UserLastName = $2, UserEmailVerified = $3, UserVerificationCode = $4 WHERE UserID = $5 returning*", [firstname, lastname, emailverified, verificationcode, id]);
};

Users.updateVerificationStatus = function (id, emailverified, verificationcode) {
  return _connection["default"].query("UPDATE Users SET UserEmailVerified = $1, UserVerificationCode = $2 WHERE UserID = $3 returning*", [emailverified, verificationcode, id]);
};

var UsersCRUD = Users;
exports.UsersCRUD = UsersCRUD;
//# sourceMappingURL=user.crud.js.map