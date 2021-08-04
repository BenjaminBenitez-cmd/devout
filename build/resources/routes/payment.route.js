"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentRouter = void 0;

var _express = require("express");

var _payments = _interopRequireDefault(require("../controllers/payments"));

var router = (0, _express.Router)();
router.route("/intents").post(_payments["default"].paymentIntent);
router.route("/confirmation").post(_payments["default"].paymentConfirm);
var paymentRouter = router;
exports.paymentRouter = paymentRouter;
//# sourceMappingURL=payment.route.js.map