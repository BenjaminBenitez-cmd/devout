"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var Payment = {};

Payment.getOneByID = function (paymentid) {
  return _connection["default"].query("SELECT * FROM PaymentDetails WHERE PaymentID = $1", [paymentid]);
};

Payment.createOne = function (amount, provider, status) {
  return _connection["default"].query("INSERT INTO PaymentDetails(PaymentAmount, PaymentProvider, PaymentStatus) VALUES ($1, $2, $3) returning*", [amount, provider, status]);
};

Payment.updateOne = function (id, amount, provider, status) {
  return _connection["default"].query("\n    UPDATE PaymentDetails \n    SET \n    PaymentAmount = $1,\n    PaymentProvider = $2,\n    PaymentStatus = $3\n    WHERE PaymentID = $4\n    returning*\n    ", [amount, provider, status, id]);
};

Payment.updateStatus = function (id, status) {
  return _connection["default"].query("\n    UPDATE PaymentDetails \n    SET \n    PaymentStatus = $1\n    WHERE PaymentID = $2\n    returning*\n    ", [status, id]);
};

Payment.deleteOne = function (id) {
  return _connection["default"].query("\n      DELETE FROM PaymentDetails\n      WHERE PaymentID = $1\n      returning*\n    ", [amount, provider, status, id]);
};

var PaymentCRUD = Payment;
exports.PaymentCRUD = PaymentCRUD;
//# sourceMappingURL=payment.crud.js.map