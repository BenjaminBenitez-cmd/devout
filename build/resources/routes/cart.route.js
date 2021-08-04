"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cartRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _authorization = _interopRequireDefault(require("../controllers/authorization"));

var _cart = _interopRequireDefault(require("../controllers/cart"));

var _cartitems = _interopRequireDefault(require("../controllers/cartitems"));

var router = _express["default"].Router(); //get


router.route("/").get(_authorization["default"].protectUser, _cart["default"].getACart).post(_authorization["default"].protectUser, _cart["default"].addACart);
router.route("/:cartid")["delete"](_authorization["default"].protectUser, _cart["default"].deleteACart);
router.route("/:cartid/items").get(_authorization["default"].protectUser, _cartitems["default"].getAllItems).post(_cartitems["default"].addACartItem);
router.route("/:cartid/items/:skuid").put(_authorization["default"].protectUser, _cartitems["default"].updateCartItem)["delete"](_authorization["default"].protectUser, _cartitems["default"].deleteCartItem);
var cartRouter = router;
exports.cartRouter = cartRouter;
//# sourceMappingURL=cart.route.js.map