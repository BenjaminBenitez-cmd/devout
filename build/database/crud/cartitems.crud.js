"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CartItemCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var CartItem = {};

CartItem.getManyBySessionID = function (sessionid) {
  return _connection["default"].query("SELECT * FROM CartItem WHERE SessionID = $1", [sessionid]);
};

CartItem.getOneByID = function (cartid) {
  return _connection["default"].query("SELECT * FROM CartItem WHERE CartID = $1", [cartid]);
};

CartItem.createOne = function (sessionid, productid, skuid, quantity) {
  return _connection["default"].query("\n        INSERT INTO CartItem (SessionID, ProductID, SKUID, Quantity)\n        VALUES ($1, $2, $3, $4) returning*\n    ", [sessionid, productid, skuid, quantity]);
};

CartItem.updateQuantity = function (cartid, itemid, quantity) {
  return _connection["default"].query("UPDATE CartItem SET Quantity = $1 WHERE CartID = $2 AND SessionID = $3", [quantity, itemid, cartid]);
};

CartItem.removeOne = function (sessionid, skuid) {
  return _connection["default"].query("DELETE FROM CartItem WHERE SessionID = $1 AND SKUID = $2 returning*", [sessionid, skuid]);
};

CartItem.removeAll = function (sessionid) {
  return _connection["default"].query("DELETE FROM CartItem WHERE SessionID = $1 returning*", [sessionid, skuid]);
};

var CartItemCRUD = CartItem;
exports.CartItemCRUD = CartItemCRUD;
//# sourceMappingURL=cartitems.crud.js.map