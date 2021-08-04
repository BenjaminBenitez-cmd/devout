"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var Address = {};

Address.createOne = function (userid, city, state, phone, country, address1, address2) {
  return _connection["default"].query("INSERT INTO Addresses(UserID, AddressCity, AddressState, AddressPhone, AddressCountry, Address1, Address2) VALUES ($1, $2, $3, $4, $5, $6, $7 ) returning*", [userid, city, state, phone, country, address1, address2]);
};

Address.updateOne = function (userid, city, state, phone, country, address1, address2) {
  return _connection["default"].query("UPDATE Addresses SET AddressCity = $1, AddressState = $2, AddressPhone = $3, AddressCountry = $4, Address1 = $5, Address2 = $6 WHERE UserID = $7", [city, state, phone, country, address1, address2, userid]);
};

Address.removeOneByUserID = function (userid) {
  return _connection["default"].query("DELETE Addresses WHERE UserID = $1", [userid]);
};

Address.getOneByUserID = function (userid) {
  return _connection["default"].query("SELECT * FROM Addresses WHERE UserID = $1", [userid]);
};

var AddressCRUD = Address;
exports.AddressCRUD = AddressCRUD;
//# sourceMappingURL=addresses.crud.js.map