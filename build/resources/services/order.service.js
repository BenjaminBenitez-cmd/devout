"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _checkout = _interopRequireDefault(require("./checkout.service"));

/**
 *
 * @param {Array} cartitems cartitem ids along with their products
 */
var calculateOrder = function calculateOrder(cartitems) {
  var total = 0; //check if stock is available

  if (cartitems.length === 0) {
    cartitems[0].quantity * cartitems[0].price;
  } else {
    total = cartitems.reduce(function (a, i) {
      return a + i.price * i.quantity;
    }, 0);
  }

  return total.toString();
};

var OrderService = {
  calculateOrder: calculateOrder
};
var _default = OrderService;
exports["default"] = _default;
//# sourceMappingURL=order.service.js.map