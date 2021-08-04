"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var Admin = {};

Admin.createOne = function (username, password, firstname, lastname) {
  return _connection["default"].query("INSERT INTO AdminUsers(AdminUserName, AdminPassword, AdminFirstName, AdminLastName) \n     VALUES($1, $2, $3, $4) returning*\n    ", [username, password, firstname, lastname]);
};

Admin.updateOne = function (id, firstname, lastname) {
  return _connection["default"].query("UPDATE AdminUsers SET AdminFirstName = $1, AdminLastName = $2 WHERE AdminID = $3 returning*", [firstname, lastname, id]);
};

Admin.getOneByUserName = function (username) {
  return _connection["default"].query("SELECT * FROM AdminUsers WHERE AdminUserName = $1", [username]);
};

Admin.getOneByID = function (id) {
  return _connection["default"].query("SELECT * FROM AdminUsers WHERE AdminID = $1", [id]);
};

var AdminCRUD = Admin;
exports.AdminCRUD = AdminCRUD;
//# sourceMappingURL=admin.crud.js.map