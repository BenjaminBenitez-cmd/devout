"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SKUCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var SKU = {
  values: {}
};

SKU.values.createOne = function (productid, skuid, optionid, valueid) {
  return _connection["default"].query("\n    INSERT INTO ProductSKUValues(ProductID, SKUID, OptionID, ValueID)\n    VALUES($1, $2, $3, $4) returning*\n    ", [productid, skuid, optionid, valueid]);
};

SKU.values.getOne = function (productid, skuid, optionid) {
  return _connection["default"].query("SELECT * FROM productSKUValues WHERE (ProductID = $1 AND SKUID = $2 AND OptionID = $3)", [productid, skuid, optionid]);
};

SKU.values.getOneBySKUID = function (id) {
  return _connection["default"].query("SELECT * FROM productSKUValues WHERE SKUID = $1", [id]);
};

SKU.values.getManyByProductID = function (productid) {
  return _connection["default"].query("SELECT * FROM ProductSKUValues WHERE ProductID = $1", [productid]);
};

SKU.values.deleteOne = function (skuid, productid) {
  return _connection["default"].query("DELETE FROM ProductSKUValues WHERE SKUID = $1 AND ProductID = $3 returning*", [skuid, productid]);
};

SKU.getManyByProductID = function (productid) {
  return _connection["default"].query("SELECT * FROM ProductSKUS WHERE ProductID = $1", [productid]);
};

SKU.getOneBySKUID = function (skuid) {
  return _connection["default"].query("SELECT * FROM ProductSKUS WHERE SKUID = $1", [skuid]);
};

SKU.createOne = function (skucode, price, inventoryid, productid) {
  return _connection["default"].query("\n    INSERT INTO ProductSKUS (SKUName, Price, ProductInventoryID, ProductID) \n    VALUES ($1, $2, $3, $4) returning*\n    ", [skucode, price, inventoryid, productid]);
};

SKU.updateOne = function (id, skucode, price) {
  return _connection["default"].query("\n            UPDATE ProductSKUS\n            SET \n            SKUName = $1, \n            Price = $2\n            WHERE SKUID = $3\n            returning*\n        ", [skucode, price, id]);
};

SKU.removeOne = function (id) {
  return _connection["default"].query("DELETE FROM ProductSKUS WHERE SKUID = $1 returning*", [id]);
};

var SKUCRUD = SKU;
exports.SKUCRUD = SKUCRUD;
//# sourceMappingURL=sku.crud.js.map