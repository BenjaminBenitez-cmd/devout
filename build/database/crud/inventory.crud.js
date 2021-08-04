"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InventoryCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var Inventory = {};

Inventory.getOne = function (id) {
  return _connection["default"].query("SELECT * FROM ProductInventory WHERE InventoryID= $1", [id]);
};

Inventory.createOne = function (quantity, live, unlimited) {
  return _connection["default"].query("INSERT INTO ProductInventory(InventoryQuantity, InventoryLive, InventoryUnlimited) VALUES ($1, $2, $3) returning*", [quantity, live, unlimited]);
};

Inventory.updateOne = function (id, quantity, live, unlimited) {
  return _connection["default"].query("\n        UPDATE ProductInventory \n        SET \n        InventoryQuantity = $1,\n        InventoryLive = $2,\n        InventoryUnlimited = $3\n        WHERE InventoryID = $4\n        returning*\n    ", [quantity, live, unlimited, id]);
};

Inventory.removeOne = function (id) {
  return _connection["default"].query("\n            DELETE \n            FROM ProductInventory\n            WHERE InventoryID = $1\n            returning*\n        ", [id]);
};

Inventory.getAmount = function (skuid) {
  return _connection["default"].query(" \n    SELECT I.InventoryQuantity, I.InventoryLive, PSK.SKUID, PSK.Price, I.InventoryID\n    FROM ProductSKUS AS PSK\n    INNER JOIN ProductInventory AS I\n    ON PSK.ProductInventoryID = I.InventoryID\n    WHERE PSK.SKUID = $1\n    ", [skuid]);
};

var InventoryCRUD = Inventory;
exports.InventoryCRUD = InventoryCRUD;
//# sourceMappingURL=inventory.crud.js.map