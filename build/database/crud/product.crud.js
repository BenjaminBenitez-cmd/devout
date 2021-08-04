"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var Product = {};

Product.createOne = function (name, price, cartdescription, shortdescription, longdescription, discountID) {
  return _connection["default"].query("INSERT INTO Products(ProductName, ProductPrice, ProductCartDesc, ProductShortDesc, ProductLongDesc, ProductDiscountID) VALUES ($1, $2, $3, $4, $5, $6) returning*\n    ", [name, price, cartdescription, shortdescription, longdescription, discountID]);
};

Product.updateDiscount = function (id, discountID) {
  return _connection["default"].query("UPDATE Products SET ProductDiscountID = $1 WHERE ProductID = $2 returning*", [discountID, id]);
};

Product.updateCategory = function (id, categoryID) {
  return _connection["default"].query("UPDATE Products SET ProductCategoryID = $1 WHERE ProductID = $2 returning*", [categoryID, id]);
};

Product.updateOne = function (id, name, price, shortdescription, longdescription) {
  return _connection["default"].query("UPDATE Products \n     SET ProductName = $1, \n      ProductPrice = $2, \n      ProductShortDesc = $3, \n      ProductLongDesc = $4\n     WHERE ProductID = $5 \n     returning*\n     ", [name, price, shortdescription, longdescription, id]);
};

Product.removeOne = function (id) {
  return _connection["default"].query("DELETE FROM Products WHERE ProductID = $1 returning*", [id]);
};

Product.getMany = function () {
  return _connection["default"].query("SELECT * FROM Products");
};

Product.getOneByID = function (id) {
  return _connection["default"].query("SELECT * FROM Products WHERE ProductID = $1", [id]);
};

var ProductCRUD = Product;
exports.ProductCRUD = ProductCRUD;
//# sourceMappingURL=product.crud.js.map