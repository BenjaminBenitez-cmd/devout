"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductCatCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var ProductCategories = {};

ProductCategories.createOne = function (productid, categoryid) {
  return _connection["default"].query("INSERT INTO ProductCategories(ProductID, CategoryID) VALUES ($1, $2) returning*", [productid, categoryid]);
};

ProductCategories.removeOne = function (productid, categoryid) {
  return _connection["default"].query("DELETE FROM ProductCategories WHERE ProductID = $1 AND CategoryID = $2 returning*", [productid, categoryid]);
};

ProductCategories.getMany = function (productid) {
  return _connection["default"].query("\n  SELECT C.CategoryID, C.CategoryName FROM ProductCategories AS PC INNER JOIN Categories AS C ON C.CategoryID = PC.CategoryID WHERE PC.ProductID = $1", [productid]);
};

var ProductCatCRUD = ProductCategories;
exports.ProductCatCRUD = ProductCatCRUD;
//# sourceMappingURL=productcategories.crud.js.map