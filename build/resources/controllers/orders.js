"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _statuscodes = require("../../constants/statuscodes");

var _crud = require("../../database/crud");

var _validate = require("../../utils/validate");

var _checkout = require("../services/checkout.service");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getAllOrders = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_, response, next) {
    var orderQuery, newOrders;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _crud.OrderCRUD.getMany();

          case 3:
            orderQuery = _context3.sent;

            if (!(orderQuery.rows.length > 0)) {
              _context3.next = 8;
              break;
            }

            _context3.next = 7;
            return Promise.all(orderQuery.rows.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(order) {
                var orderdetailsid, itemsQuery, products;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        orderdetailsid = order.orderdetailsid; //Get the items belonging to this order

                        _context2.next = 3;
                        return _crud.OrderCRUD.items.getManyByOrderDetailsID(orderdetailsid);

                      case 3:
                        itemsQuery = _context2.sent;

                        if (!(itemsQuery.rows.length > 0)) {
                          _context2.next = 8;
                          break;
                        }

                        _context2.next = 7;
                        return Promise.all(itemsQuery.rows.map( /*#__PURE__*/function () {
                          var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(item) {
                            var productQuery, _productQuery$rows$, productid, productname, productprice;

                            return _regenerator["default"].wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return _crud.ProductCRUD.getOneByID(item.productid);

                                  case 2:
                                    productQuery = _context.sent;
                                    _productQuery$rows$ = productQuery.rows[0], productid = _productQuery$rows$.productid, productname = _productQuery$rows$.productname, productprice = _productQuery$rows$.productprice;
                                    return _context.abrupt("return", {
                                      id: productid,
                                      name: productname,
                                      price: productprice
                                    });

                                  case 5:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x5) {
                            return _ref3.apply(this, arguments);
                          };
                        }()));

                      case 7:
                        products = _context2.sent;

                      case 8:
                        return _context2.abrupt("return", _objectSpread(_objectSpread({}, order), {}, {
                          products: products
                        }));

                      case 9:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 7:
            newOrders = _context3.sent;

          case 8:
            response.status(_statuscodes.SUCCESS).json({
              message: "Success",
              orders: newOrders
            });
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function getAllOrders(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); //Get user orders


var getAllUserOrders = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(request, response, next) {
    var id, orderQuery, orders;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = request.user.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _crud.OrderCRUD.getManyByUserID(id);

          case 4:
            orderQuery = _context4.sent;
            orders = [];

            if (orderQuery.rows.length > 0) {
              orders = orderQuery.rows.map(function (order) {
                return {
                  id: order.orderdetailsid,
                  total: order.orderdetailtotal,
                  status: order.paymentstatus
                };
              });
            }

            response.status(_statuscodes.SUCCESS).json({
              message: "success",
              orders: orders
            });
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](1);
            next(_context4.t0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 10]]);
  }));

  return function getAllUserOrders(_x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var createPublicOrder = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(request, response, next) {
    var id, email, cartQuery, cartItemsQuery, isValid;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = request.user.id;
            email = request.body.email;
            /**
             *check if if items in cart are available
             *check if user has address
             *check if user has payment details
             *create an order details column
             *create order items for each item in the cart
             *Update the inventory for each product
             */

            _context6.prev = 2;
            _context6.next = 5;
            return _crud.CartCRUD.getOneByUserID(id);

          case 5:
            cartQuery = _context6.sent;
            (0, _validate.checkResults)(cartQuery, _statuscodes.NOT_FOUND, "No cart found"); //get cartitems with cart id

            _context6.next = 9;
            return _crud.CartItemCRUD.getManyBySessionID(cartQuery.rows[0].sessionid);

          case 9:
            cartItemsQuery = _context6.sent;
            (0, _validate.checkResults)(cartItemsQuery, _statuscodes.NOT_FOUND, "No items found");
            _context6.next = 13;
            return _checkout.checkoutService.validateItems(cartItemsQuery.rows);

          case 13:
            isValid = _context6.sent;
            // const newOrder = await checkoutService.createNewOrder(id, isValid);
            //Cart and inventory clean up
            isValid.forEach( /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(item) {
                var newInventoryQuantity, isLive;
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        newInventoryQuantity = item.inventoryquantity - item.quantity;
                        isLive = item.inventorylive;
                        _context5.next = 4;
                        return _crud.InventoryCRUD.updateOne(item.inventoryid, newInventoryQuantity, isLive);

                      case 4:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x12) {
                return _ref6.apply(this, arguments);
              };
            }());
            _context6.next = 17;
            return _crud.CartCRUD.removeOne(cartQuery.rows[0].sessionid, id);

          case 17:
            response.status(_statuscodes.SUCCESS).json({
              message: "success",
              orders: {
                id: newOrder.orderdetailsid
              }
            });
            _context6.next = 23;
            break;

          case 20:
            _context6.prev = 20;
            _context6.t0 = _context6["catch"](2);
            next(_context6.t0);

          case 23:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 20]]);
  }));

  return function createPublicOrder(_x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

var createOrder = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(request, response, next) {
    var id, cartQuery, cartItemsQuery, isValid, _newOrder;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = request.user.id;
            /**
             *check if if items in cart are available
             *check if user has address
             *check if user has payment details
             *create an order details column
             *create order items for each item in the cart
             *Update the inventory for each product
             */

            _context8.prev = 1;
            _context8.next = 4;
            return _crud.CartCRUD.getOneByUserID(id);

          case 4:
            cartQuery = _context8.sent;
            (0, _validate.checkResults)(cartQuery, _statuscodes.NOT_FOUND, "No cart found"); //get cartitems with cart id

            _context8.next = 8;
            return _crud.CartItemCRUD.getManyBySessionID(cartQuery.rows[0].sessionid);

          case 8:
            cartItemsQuery = _context8.sent;
            (0, _validate.checkResults)(cartItemsQuery, _statuscodes.NOT_FOUND, "Cannot create order without items in cart");
            _context8.next = 12;
            return _checkout.checkoutService.validateItems(cartItemsQuery.rows);

          case 12:
            isValid = _context8.sent;
            _context8.next = 15;
            return _checkout.checkoutService.createNewOrder(id, isValid);

          case 15:
            _newOrder = _context8.sent;
            //Cart and inventory clean up
            isValid.forEach( /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(item) {
                var newInventoryQuantity, isLive;
                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        newInventoryQuantity = item.inventoryquantity - item.quantity;
                        isLive = item.inventorylive;
                        _context7.next = 4;
                        return _crud.InventoryCRUD.updateOne(item.inventoryid, newInventoryQuantity, isLive);

                      case 4:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function (_x16) {
                return _ref8.apply(this, arguments);
              };
            }());
            _context8.next = 19;
            return _crud.CartCRUD.removeOne(cartQuery.rows[0].sessionid, id);

          case 19:
            response.status(_statuscodes.SUCCESS).json({
              message: "success",
              orders: {
                id: _newOrder.orderdetailsid
              }
            });
            _context8.next = 25;
            break;

          case 22:
            _context8.prev = 22;
            _context8.t0 = _context8["catch"](1);
            next(_context8.t0);

          case 25:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 22]]);
  }));

  return function createOrder(_x13, _x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

var getAnOrder = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(request, response, next) {
    var orderid, orderItems, orderInfo, paymentInfo, customerInfo, itemsAndProducts;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            orderid = request.params.orderid;
            _context10.prev = 1;
            _context10.next = 4;
            return _crud.OrderCRUD.items.getManyByOrderDetailsID(orderid);

          case 4:
            orderItems = _context10.sent;
            _context10.next = 7;
            return _crud.OrderCRUD.details.getOne(orderid);

          case 7:
            orderInfo = _context10.sent;
            _context10.next = 10;
            return _crud.PaymentCRUD.getOneByID(orderInfo.rows[0].orderdetailpaymentid);

          case 10:
            paymentInfo = _context10.sent;
            _context10.next = 13;
            return _crud.UsersCRUD.getOneByID(orderInfo.rows[0].userid);

          case 13:
            customerInfo = _context10.sent;
            _context10.next = 16;
            return Promise.all(orderItems.rows.map( /*#__PURE__*/function () {
              var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(item) {
                var productQuery;
                return _regenerator["default"].wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return _crud.ProductCRUD.getOneByID(item.productid);

                      case 2:
                        productQuery = _context9.sent;
                        return _context9.abrupt("return", {
                          id: item.orderitemsid,
                          name: productQuery.rows[0].productname,
                          quantity: item.orderquantity,
                          total: item.orderquantity * productQuery.rows[0].productprice
                        });

                      case 4:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x20) {
                return _ref10.apply(this, arguments);
              };
            }()));

          case 16:
            itemsAndProducts = _context10.sent;
            response.status(200).json({
              message: "Success",
              order: {
                id: orderid,
                paymentinfo: {
                  id: paymentInfo.rows[0].paymentid,
                  amount: paymentInfo.rows[0].paymentamount,
                  status: paymentInfo.rows[0].paymentstatus
                },
                items: itemsAndProducts,
                customer: {
                  email: customerInfo.rows[0].useremail
                }
              }
            });
            _context10.next = 23;
            break;

          case 20:
            _context10.prev = 20;
            _context10.t0 = _context10["catch"](1);
            next(_context10.t0);

          case 23:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 20]]);
  }));

  return function getAnOrder(_x17, _x18, _x19) {
    return _ref9.apply(this, arguments);
  };
}();

var OrderControllers = {
  getAnOrder: getAnOrder,
  getAllOrders: getAllOrders,
  getAllUserOrders: getAllUserOrders,
  createOrder: createOrder
};
var _default = OrderControllers;
exports["default"] = _default;
//# sourceMappingURL=orders.js.map