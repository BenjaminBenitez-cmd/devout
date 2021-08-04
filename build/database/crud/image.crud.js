"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var Image = {};

Image.createOne = function (url, productID, SKUID) {
  return _connection["default"].query("INSERT INTO ProductImages(ImageUrl, ProductID, SKUID) VALUES ($1, $2, $3) returning*", [url, productID, SKUID]);
};

Image.getManyByProductAndSKU = function (productid, skuid) {
  return _connection["default"].query("SELECT ImageUrl, ImageID FROM ProductImages WHERE ProductID = $1 AND SKUID = $2", [productid, skuid]);
};

Image.deleteOne = function (id) {
  return _connection["default"].query("DELETE FROM ProductImages WHERE ImageID=$1 returning*", [id]);
};

var ImageCRUD = Image;
exports.ImageCRUD = ImageCRUD;
//# sourceMappingURL=image.crud.js.map