"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscountCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var Discount = {};

Discount.getOne = function (id) {
  return _connection["default"].query("SELECT * FROM ProductDiscounts WHERE DiscountID = $1", [id]);
};

Discount.getMany = function () {
  return _connection["default"].query("SELECT * FROM ProductDiscounts");
};

Discount.createOne = function (name, amount, quantity, startdate, expirydate) {
  return _connection["default"].query("\n    INSERT INTO ProductDiscounts(DiscountName, DiscountAmount, DiscountQuantity, DiscountStartDate, DiscountExpiryDate\n    VALUES ($1, $2, $3, $4) returning", [name, amount, quantity, startdate, expirydate]);
};

Discount.updateOne = function (id, name, amount, quantity, startdate, expirydate) {
  return _connection["default"].query("\n        UPDATE ProductDiscounts\n        SET \n        DiscountName = $1,\n        DiscountAmount = $2, \n        DiscountQuantity = $3,\n        DiscountStartDate = $4,\n        DicsountExpiryDate = $5,\n        WHERE DiscountID = $6\n        returning*\n    ", [id, name, amount, quantity, startdate, expirydate]);
};

Discount.removeOne = function (id) {
  return _connection["default"].query("DELETE FROM ProductDiscounts WHERE DiscountID = $1 returning*", [id]);
};

var DiscountCRUD = Discount;
exports.DiscountCRUD = DiscountCRUD;
//# sourceMappingURL=discounts.crud.js.map