"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var Categories = {};

Categories.getMany = function () {
  return _connection["default"].query("SELECT * FROM Categories");
};

Categories.getManyForProduct = function (productid) {
  return _connection["default"].query("SELECT * \n                  FROM ProductCategories AS PC\n                  INNER JOIN Categories AS C\n                  ON C.CategoryID = PC.CategoryID\n                  WHERE PC.ProductID = $1\n                    \n  ", [productid]);
};

Categories.getOne = function (id) {
  return _connection["default"].query("SELECT * FROM ProductCategories WHERE ProductID = $1", [id]);
};

Categories.createOne = function (name) {
  return _connection["default"].query("INSERT INTO Categories (CategoryName) VALUES ($1) returning*", [name]);
};

Categories.updateOne = function (id, name) {
  return _connection["default"].query("UPDATE Categories SET CategoryName = $1 WHERE CategoryID = $2 returning*", [name, id]);
};

Categories.removeOne = function (id) {
  return _connection["default"].query("DELETE FROM Categories WHERE CategoryID = $1 returning*", [id]);
};

var CategoriesCRUD = Categories;
exports.CategoriesCRUD = CategoriesCRUD;
//# sourceMappingURL=categories.crud.js.map