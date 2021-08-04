"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _products = require("./resources/routes/products.route");

var _orders = require("./resources/routes/orders.route");

var _categories = require("./resources/routes/categories.route");

var _user = require("./resources/routes/user.route");

var _cart = require("./resources/routes/cart.route");

var _userorder = require("./resources/routes/userorder.route");

var _address = require("./resources/routes/address.route");

var _errors = require("./utils/errors");

var _authorization = _interopRequireDefault(require("./resources/controllers/authorization"));

var _image = require("./resources/routes/image.route");

var _cors = _interopRequireDefault(require("cors"));

var _payment = require("./resources/routes/payment.route");

//routers
//Status codes
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _morgan["default"])("tiny"));
app.use((0, _cors["default"])());
app.use(_express["default"]["static"](__dirname + "/public"));
app.get("/", function (_, response) {
  response.send("Welcome to Devout :)");
});
app.use("/api/v1/products", _products.productRouter);
app.use("/api/v1/categories", _categories.categoryRouter);
app.use("/api/v1/orders", _orders.orderRouter);
app.use("/api/v1/images", _image.imageRouter); //routes for handling user requests

app.use("/api/v1/users/payments", _payment.paymentRouter);
app.use("/api/v1/users/address", _address.addressRouter);
app.use("/api/v1/users/cart", _cart.cartRouter);
app.use("/api/v1/users/orders", _userorder.userOrderRouter);
app.use("/api/v1/users", _user.userRouter); //admin routes

app.post("/api/v1/admin/signin", _authorization["default"].signInAnAdmin);
app.post("/api/v1/admin/signup", _authorization["default"].createAnAdmin);
var port = process.env.PORT || 3005;
app.use(function (error, _, response, next) {
  (0, _errors.handleError)(error, response);
});
module.exports = app.listen(port, function () {
  console.log("Listening on port ".concat(port, "..."));
});
//# sourceMappingURL=index.js.map