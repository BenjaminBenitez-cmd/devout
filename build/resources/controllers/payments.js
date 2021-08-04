"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _stripe = _interopRequireDefault(require("stripe"));

var _config = _interopRequireDefault(require("../../config"));

var _statuscodes = require("../../constants/statuscodes");

var _user = require("../../database/crud/user.crud");

var _errors = require("../../utils/errors");

var _tokens = _interopRequireDefault(require("../../utils/tokens"));

var _checkout = _interopRequireDefault(require("../services/checkout.service"));

var _order = _interopRequireDefault(require("../services/order.service"));

var stripeInstance = (0, _stripe["default"])(_config["default"].STRIPE_KEY);

var paymentIntent = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
    var userid, items, email, token, jwt, isValid, userQuery, orderQuery, _paymentIntent;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userid = null;
            items = request.body.items;
            email = request.body.email;
            _context.prev = 3;

            if (!request.headers.authorization) {
              _context.next = 14;
              break;
            }

            token = request.headers.authorization; //check token format

            if (!token.startsWith("Bearer ")) {
              next(new _errors.ErrorHandler(NOT_AUTHORIZED, "Invalid Token"));
            }

            jwt = token.split(" ", 2)[1];
            _context.next = 10;
            return _tokens["default"].verifyToken(jwt);

          case 10:
            isValid = _context.sent;
            userid = isValid.id;
            _context.next = 18;
            break;

          case 14:
            _context.next = 16;
            return _user.UsersCRUD.createOne(email, null, null, null);

          case 16:
            userQuery = _context.sent;
            userid = userQuery.rows[0].userid;

          case 18:
            _context.next = 20;
            return _checkout["default"].createNewOrder(userid, items);

          case 20:
            orderQuery = _context.sent;
            _context.next = 23;
            return stripeInstance.paymentIntents.create({
              amount: 400,
              currency: "usd",
              metadata: {
                orderid: orderQuery.orderdetailsid,
                userid: userid
              }
            });

          case 23:
            _paymentIntent = _context.sent;
            response.status(_statuscodes.SUCCESS).send({
              clientSecret: _paymentIntent.client_secret,
              clientid: userid,
              orderid: orderQuery
            });
            _context.next = 30;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](3);
            next(_context.t0);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 27]]);
  }));

  return function paymentIntent(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var paymentConfirm = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response) {
    var event, paymentIntent, paymentMethod;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            event = request.body;
            paymentIntent = event.data.object; // Handle the event

            _context2.t0 = event.type;
            _context2.next = _context2.t0 === "payment_intent.succeeded" ? 5 : _context2.t0 === "payment_intent.failed" ? 8 : _context2.t0 === "payment_method.attached" ? 11 : 13;
            break;

          case 5:
            _context2.next = 7;
            return _checkout["default"].acceptOrder(paymentIntent.metadata.userid, paymentIntent.metadata.orderid);

          case 7:
            return _context2.abrupt("break", 14);

          case 8:
            _context2.next = 10;
            return _checkout["default"].declineOrder(paymentIntent.metadata.orderid);

          case 10:
            return _context2.abrupt("break", 14);

          case 11:
            paymentMethod = event.data.object; // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);

            return _context2.abrupt("break", 14);

          case 13:
            return _context2.abrupt("break", 14);

          case 14:
            // Return a response to acknowledge receipt of the event
            response.json({
              received: true
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function paymentConfirm(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var PaymentControllers = {
  paymentIntent: paymentIntent,
  paymentConfirm: paymentConfirm
};
var _default = PaymentControllers;
exports["default"] = _default;
//# sourceMappingURL=payments.js.map