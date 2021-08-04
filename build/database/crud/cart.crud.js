"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CartCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var Cart = {};

Cart.createOne = function (userid, cartquantity) {
  return _connection["default"].query("INSERT INTO ShoppingSession(UserID, CartQuantity) VALUES($1, $2) returning*", [userid, cartquantity]);
};

Cart.removeOne = function (sessionid, userid) {
  return _connection["default"].query("DELETE FROM ShoppingSession WHERE SessionID = $1 AND UserID = $2", [sessionid, userid]);
};

Cart.getOneByUserID = function (id) {
  return _connection["default"].query("SELECT * FROM ShoppingSession WHERE UserID = $1", [id]);
};

Cart.updateQuantity = function (id, quantity) {
  return _connection["default"].query("UPDATE ShoppingSession SET CartQuantity = $1 WHERE SessionID = $2 returing*", [id, quantity]);
};

var CartCRUD = Cart;
exports.CartCRUD = CartCRUD;
//# sourceMappingURL=cart.crud.js.map