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

var _errors = require("../../utils/errors");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * ValidateItems will check the inventory against items
 * @param {array} items an array of cart items
 * @return {promise} returns a promise or error
 */
var validateItems = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(items) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resolve, reject) {
                var mappedItems;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return Promise.all(items.map( /*#__PURE__*/function () {
                          var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(item) {
                            var inventoryQuery, _inventoryQuery$rows$, inventoryquantity, inventorylive, isValid;

                            return _regenerator["default"].wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return _crud.InventoryCRUD.getAmount(item.skuid);

                                  case 2:
                                    inventoryQuery = _context.sent;
                                    (0, _validate.checkResults)(inventoryQuery, _statuscodes.NOT_FOUND, "Inventory not found");
                                    _inventoryQuery$rows$ = inventoryQuery.rows[0], inventoryquantity = _inventoryQuery$rows$.inventoryquantity, inventorylive = _inventoryQuery$rows$.inventorylive;
                                    isValid = (0, _validate.checkIfAvailable)(inventoryquantity, inventorylive, item.quantity);

                                    if (!isValid) {
                                      reject(new _errors.ErrorHandler(_statuscodes.NOT_FOUND, "Product Unavailable"));
                                    }

                                    return _context.abrupt("return", _objectSpread(_objectSpread({}, item), inventoryQuery.rows[0]));

                                  case 8:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x4) {
                            return _ref3.apply(this, arguments);
                          };
                        }()));

                      case 3:
                        mappedItems = _context2.sent;
                        resolve(mappedItems);
                        _context2.next = 10;
                        break;

                      case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2["catch"](0);
                        reject(_context2.t0);

                      case 10:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[0, 7]]);
              }));

              return function (_x2, _x3) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function validateItems(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 *
 * @param {array} items items that will be used to create order
 * @return { promise } will contain new order or an error
 */


var createNewOrder = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(userid, items) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve, reject) {
                var total, provider, status, paymentQuery, orderDetailQuery;
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.prev = 0;
                        total = items.length > 1 ? items.reduce(function (a, b) {
                          return a.price * a.quantity + b.price * b.quantity;
                        }, 0) : items[0].quantity * items[0].price;
                        provider = "stripe", status = "initialized";
                        _context5.next = 5;
                        return _crud.PaymentCRUD.createOne(total, provider, status);

                      case 5:
                        paymentQuery = _context5.sent;
                        _context5.next = 8;
                        return _crud.OrderCRUD.createOne(userid, total, paymentQuery.rows[0].paymentid);

                      case 8:
                        orderDetailQuery = _context5.sent;

                        if (orderDetailQuery.rows.length < 0) {
                          reject(new _errors.ErrorHandler(_statuscodes.NOT_FOUND, "Unable to add order"));
                        }

                        items.forEach( /*#__PURE__*/function () {
                          var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(item) {
                            return _regenerator["default"].wrap(function _callee4$(_context4) {
                              while (1) {
                                switch (_context4.prev = _context4.next) {
                                  case 0:
                                    _context4.next = 2;
                                    return _crud.OrderCRUD.items.createOne(orderDetailQuery.rows[0].orderdetailsid, item.productid, item.skuid, item.quantity);

                                  case 2:
                                  case "end":
                                    return _context4.stop();
                                }
                              }
                            }, _callee4);
                          }));

                          return function (_x9) {
                            return _ref6.apply(this, arguments);
                          };
                        }());
                        resolve(orderDetailQuery.rows[0]);
                        _context5.next = 17;
                        break;

                      case 14:
                        _context5.prev = 14;
                        _context5.t0 = _context5["catch"](0);
                        reject(_context5.t0);

                      case 17:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, null, [[0, 14]]);
              }));

              return function (_x7, _x8) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function createNewOrder(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 *
 * @param {Integer} orderid
 * @returns resolved promise
 */


var acceptOrder = function acceptOrder(userid, orderid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(resolve, reject) {
      var orderQuery, orderItems, cartQuery;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _crud.OrderCRUD.details.getOne(orderid);

            case 3:
              orderQuery = _context8.sent;
              _context8.next = 6;
              return _crud.PaymentCRUD.updateStatus(orderQuery.rows[0].orderdetailpaymentid, "Fullfilled");

            case 6:
              _context8.next = 8;
              return _crud.OrderCRUD.items.getManyByOrderDetailsID(orderQuery.rows[0].orderdetailsid);

            case 8:
              orderItems = _context8.sent;
              //update the inventory numbers for all the products
              orderItems.rows.forEach( /*#__PURE__*/function () {
                var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(item) {
                  var skuQuery, inventoryQuery, newQuantity, isLive;
                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return _crud.SKUCRUD.getOneBySKUID(item.skuid);

                        case 2:
                          skuQuery = _context7.sent;
                          _context7.next = 5;
                          return _crud.InventoryCRUD.getOne(skuQuery.rows[0].productinventoryid);

                        case 5:
                          inventoryQuery = _context7.sent;
                          newQuantity = inventoryQuery.rows[0].inventoryquantity - item.orderquantity;
                          isLive = newQuantity === 0 && false;
                          _context7.next = 10;
                          return _crud.InventoryCRUD.updateOne(inventoryQuery.rows[0].inventoryid, newQuantity, isLive);

                        case 10:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));

                return function (_x12) {
                  return _ref8.apply(this, arguments);
                };
              }());
              _context8.next = 12;
              return _crud.CartCRUD.getOneByUserID(userid);

            case 12:
              cartQuery = _context8.sent;

              if (!(cartQuery.rows.length > 0)) {
                _context8.next = 16;
                break;
              }

              _context8.next = 16;
              return _crud.CartItemCRUD.removeAll(cartQuery.rows[0].sessionid);

            case 16:
              resolve(true);
              _context8.next = 22;
              break;

            case 19:
              _context8.prev = 19;
              _context8.t0 = _context8["catch"](0);
              reject(_context8.t0);

            case 22:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 19]]);
    }));

    return function (_x10, _x11) {
      return _ref7.apply(this, arguments);
    };
  }());
};

var declineOrder = function declineOrder(orderid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(resolve, reject) {
      var orderDetailQuery;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _crud.OrderCRUD.details.getManyByOrderDetailsID(orderid);

            case 3:
              orderDetailQuery = _context9.sent;
              _context9.next = 6;
              return _crud.PaymentCRUD.updateStatus(orderDetailQuery.rows[0].orderdetailpaymentid, "Canceled");

            case 6:
              resolve(true);
              _context9.next = 12;
              break;

            case 9:
              _context9.prev = 9;
              _context9.t0 = _context9["catch"](0);
              reject(_context9.t0);

            case 12:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 9]]);
    }));

    return function (_x13, _x14) {
      return _ref9.apply(this, arguments);
    };
  }());
};

var checkoutService = {
  validateItems: validateItems,
  createNewOrder: createNewOrder,
  declineOrder: declineOrder,
  acceptOrder: acceptOrder
};
var _default = checkoutService;
exports["default"] = _default;
//# sourceMappingURL=checkout.service.js.map