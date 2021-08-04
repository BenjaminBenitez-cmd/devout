"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.sendReceiptEmail = exports.sendVerificationMail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var sgMail = require("@sendgrid/mail");

var _require = require("../../config"),
    config = _require["default"];

sgMail.setApiKey(config.SENDGRID_API_KEY);
var sender_email = config.SENDER_EMAIL;
var templates = {
  verification_email: "d-fce4a4bf853e421b8b7614bed46f706f",
  receipt: "d-262d84868da3406f8222cab0ae51dad6"
};

var sendVerificationMail = function sendVerificationMail(receiver_email, recipient_name, unique_url) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
      var msg, response;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              msg = {
                to: receiver_email,
                from: sender_email,
                template_id: templates.verification_email,
                dynamic_template_data: {
                  recipient_name: recipient_name,
                  unique_url: unique_url
                }
              };
              _context.prev = 1;
              _context.next = 4;
              return sgMail.send(msg);

            case 4:
              response = _context.sent;
              resolve(response);
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              reject(_context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.sendVerificationMail = sendVerificationMail;

var sendReceiptEmail = function sendReceiptEmail(receiver_email, order_id, order_items) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resolve, reject) {
      var msg, response;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              msg = {
                to: receiver_email,
                from: sender_email,
                template_id: templates.receipt,
                dynamic_template_data: {
                  order_items: order_items,
                  recipient_email: receiver_email,
                  order_id: order_id
                }
              };
              _context2.prev = 1;
              _context2.next = 4;
              return sgMail.send(msg);

            case 4:
              response = _context2.sent;
              resolve(response);
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              reject(_context2.t0.response.body);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 8]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};

exports.sendReceiptEmail = sendReceiptEmail;
var SendGridService = {
  sendVerificationMail: sendVerificationMail,
  sendReceiptEmail: sendReceiptEmail
};
var _default = SendGridService;
exports["default"] = _default;
//# sourceMappingURL=sendgrid.service.js.map