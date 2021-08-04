"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addressRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _addresses = _interopRequireDefault(require("../controllers/addresses"));

var _authorization = _interopRequireDefault(require("../controllers/authorization"));

var router = _express["default"].Router();

router.route("/").get(_authorization["default"].protectUser, _addresses["default"].getAddress).put(_authorization["default"].protectUser, _addresses["default"].updateAddress).post(_authorization["default"].protectUser, _addresses["default"].addAAddress);
var addressRouter = router;
exports.addressRouter = addressRouter;
//# sourceMappingURL=address.route.js.map