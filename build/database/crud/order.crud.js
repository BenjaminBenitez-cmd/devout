"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderCRUD = void 0;

var _connection = _interopRequireDefault(require("../connection"));

var Orders = {
  details: {},
  items: {}
};

Orders.details.createOne = function (userid, total, paymentid) {
  return _connection["default"].query("INSERT INTO OrderDetails(UserID, OrderDetailTotal, OrderDetailPaymentID) VALUES ($1, $2, $3) returning*", [userid, total, paymentid]);
};

Orders.details.getManyByUserID = function (userid) {
  return _connection["default"].query("SELECT * FROM OrderDetails WHERE UserID = $1", [userid]);
};

Orders.details.getOne = function (orderdetailsid) {
  return _connection["default"].query("SELECT * FROM OrderDetails WHERE OrderDetailsID = $1", [orderdetailsid]);
};

Orders.details.removeOne = function (orderdetailsid) {
  return _connection["default"].query("DELETE FROM OrderDetails WHERE OrderDetailsID = $1", [orderdetailsid]);
};

Orders.items.createOne = function (detailsid, productid, skuid, quantity) {
  return _connection["default"].query("INSERT INTO OrderItems (OrderDetailsID, ProductID, SKUID, OrderQuantity) VALUES ($1, $2, $3, $4) returning*", [detailsid, productid, skuid, quantity]);
};

Orders.items.getManyByProductID = function (id) {
  return _connection["default"].query("SELECT * FROM OrderItems WHERE ProductID = $1", [id]);
};

Orders.items.getManyByOrderDetailsID = function (id) {
  return _connection["default"].query("SELECT * FROM OrderItems WHERE OrderDetailsID = $1", [id]);
};

Orders.items.getSalesByProductID = function (id) {
  return _connection["default"].query("\n    SELECT *\n    FROM OrderItems AS oi \n    INNER JOIN OrderDetails AS od\n    ON oi.OrderDetailsID = od.OrderDetailsID\n    INNER JOIN PaymentDetails as pd\n    ON pd.PaymentID = od.OrderDetailPaymentID AND pd.paymentstatus = 'Fullfilled'\n    WHERE oi.ProductID = $1\n  ", [id]);
};

Orders.getMany = function () {
  return _connection["default"].query("\n    SELECT OD.OrderDetailsID, U.UserEmail, OD.OrderDetailTotal, PD.PaymentStatus, PD.PaymentID\n    FROM OrderDetails AS OD\n    INNER JOIN PaymentDetails AS PD\n    ON OD.OrderDetailPaymentID = PD.PaymentID\n    INNER JOIN Users AS U\n    ON OD.UserID = U.UserID\n  ");
};

Orders.getManyByUserID = function (userid) {
  return _connection["default"].query("\n    SELECT OD.OrderDetailsID, OD.OrderDetailTotal, PD.PaymentAmount, PD.PaymentStatus FROM OrderDetails AS OD\n    INNER JOIN PaymentDetails AS PD\n    ON PD.PaymentID = OD.OrderDetailPaymentID\n    WHERE OD.UserID = $1 AND NOT PD.PaymentStatus = 'initialized' \n  ", [userid]);
};

Orders.createOne = function (userid, total, paymentid) {
  return _connection["default"].query("\n    INSERT INTO OrderDetails (UserID, OrderDetailTotal, OrderDetailPaymentID)\n    VALUES ($1, $2, $3) returning*;\n  ", [userid, total, paymentid]);
};

var OrderCRUD = Orders;
exports.OrderCRUD = OrderCRUD;
//# sourceMappingURL=order.crud.js.map