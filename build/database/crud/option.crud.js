"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductOptionsCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var Options = {
  values: {}
};

Options.values.getMany = function (optionid) {
  return _connection["default"].query("SELECT * FROM ProductOptionValues WHERE OptionID = $1", [optionid]);
};

Options.values.getOne = function (valueid) {
  return _connection["default"].query("SELECT * FROM ProductOptionValues WHERE ValueID = $1", [valueid]);
};

Options.values.createOne = function (name, productid, optionid) {
  return _connection["default"].query("\n    INSERT INTO ProductOptionValues(ValueName, ProductID, OptionID) \n    VALUES ($1, $2, $3) returning*", [name, productid, optionid]);
};

Options.values.updateOne = function (id, name) {
  return _connection["default"].query("\n        UPDATE ProductOptionValues\n        SET ValueName = $1\n        WHERE ValueID = $2\n        returning* \n    ", [name, id]);
};

Options.values.removeOne = function (id) {
  return _connection["default"].query("DELETE FROM ProductOptionValues WHERE ValueID = $1 returning*", [id]);
};

Options.getMany = function (productid) {
  return _connection["default"].query("SELECT * FROM ProductOptions WHERE ProductID = $1", [productid]);
};

Options.getOne = function (id) {
  return _connection["default"].query("SELECT * FROM ProductOptions WHERE OptionID = $1", [id]);
};

Options.createOne = function (productID, name) {
  return _connection["default"].query("\n        INSERT INTO ProductOptions(ProductID, OptionName) \n        VALUES ($1, $2)\n        returning*\n    ", [productID, name]);
};

Options.updateOne = function (id, name) {
  return _connection["default"].query("\n        UPDATE ProductOptions\n        SET \n        OptionName = $1\n        WHERE OptionID = $2\n        returning*\n    ", [name, id]);
};

Options.removeOne = function (id) {
  return _connection["default"].query("DELETE FROM ProductOptions WHERE OptionID = $1 returning*", [id]);
};

var ProductOptionsCRUD = Options;
exports.ProductOptionsCRUD = ProductOptionsCRUD;
//# sourceMappingURL=option.crud.js.map