"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderRouter = void 0;

var _express = require("express");

var _orders = _interopRequireDefault(require("../controllers/orders"));

var router = (0, _express.Router)();
router.route("/").get(_orders["default"].getAllOrders);
router.route("/:orderid").get(_orders["default"].getAnOrder);
var orderRouter = router;
exports.orderRouter = orderRouter;
//# sourceMappingURL=orders.route.js.map