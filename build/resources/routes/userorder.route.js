"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userOrderRouter = void 0;

var _express = require("express");

var _authorization = _interopRequireDefault(require("../controllers/authorization"));

var _orders = _interopRequireDefault(require("../controllers/orders"));

var _payments = _interopRequireDefault(require("../controllers/payments"));

var router = (0, _express.Router)(); //user orders

router.route("/").get(_authorization["default"].protectUser, _orders["default"].getAllUserOrders).post(_authorization["default"].protectUser, _orders["default"].createOrder);
var userOrderRouter = router;
exports.userOrderRouter = userOrderRouter;
//# sourceMappingURL=userorder.route.js.map