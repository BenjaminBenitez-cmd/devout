"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _validate = require("../../utils/validate");

var _errors = require("../../utils/errors");

var _crud = require("../../database/crud");

var _statuscodes = require("../../constants/statuscodes");

var _connection = _interopRequireDefault(require("../../database/connection"));

var getAllItems = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response, next) {
    var cartid, cartItemsQuery, cartItems;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cartid = request.params.cartid;
            /**
             * get items in cart
             */

            _context2.prev = 1;
            _context2.next = 4;
            return _crud.CartItemCRUD.getManyBySessionID(cartid);

          case 4:
            cartItemsQuery = _context2.sent;
            _context2.next = 7;
            return Promise.all(cartItemsQuery.rows.length > 0 && cartItemsQuery.rows.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(item) {
                var products, images;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return ProductCRUD.getOneByID(item.productid);

                      case 2:
                        products = _context.sent;
                        _context.next = 5;
                        return _crud.ImageCRUD.getManyByProductAndSKU(item.productid, item.skuid);

                      case 5:
                        images = _context.sent;
                        return _context.abrupt("return", {
                          id: item.cartid,
                          productid: item.productid,
                          skuid: item.skuid,
                          quantity: item.quantity,
                          name: products.rows[0].productname,
                          images: images.rows,
                          price: products.rows[0].productprice
                        });

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 7:
            cartItems = _context2.sent;
            response.status(_statuscodes.SUCCESS).json({
              message: "Success",
              items: cartItems
            });
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);
            next(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 11]]);
  }));

  return function getAllItems(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var updateCartItem = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request, response, next) {
    var _request$params, cartid, itemid, quantity, itemQuery, skuid, inventoryQuery, _inventoryQuery$rows$, inventoryquantity, inventorylive;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _request$params = request.params, cartid = _request$params.cartid, itemid = _request$params.itemid;
            quantity = request.body.quantity;
            /**
             * get items in cart
             * use the item id to fetch the cart item
             * check if it is available
             * update the item
             */

            _context3.prev = 2;
            _context3.next = 5;
            return _crud.CartItemCRUD.getOneByID(itemid);

          case 5:
            itemQuery = _context3.sent;
            (0, _validate.checkResults)(itemQuery, _statuscodes.NOT_FOUND, "Could not find item");
            skuid = itemQuery.rows[0].skuid;
            _context3.next = 10;
            return _crud.InventoryCRUD.getAmount(skuid);

          case 10:
            inventoryQuery = _context3.sent;
            _inventoryQuery$rows$ = inventoryQuery.rows[0], inventoryquantity = _inventoryQuery$rows$.inventoryquantity, inventorylive = _inventoryQuery$rows$.inventorylive; //Check for inventory amounts

            if (!(inventoryquantity === 0)) {
              _context3.next = 16;
              break;
            }

            throw new _errors.ErrorHandler(_statuscodes.NOT_FOUND, "Product is out of stock");

          case 16:
            if (inventorylive) {
              _context3.next = 20;
              break;
            }

            throw new _errors.ErrorHandler(_statuscodes.NOT_FOUND, "Product is not live");

          case 20:
            if (!(quantity > inventoryquantity)) {
              _context3.next = 22;
              break;
            }

            throw new (_statuscodes.NOT_FOUND, "Product is out of stock")();

          case 22:
            _context3.next = 24;
            return _crud.CartItemCRUD.updateQuantity(cartid, itemid, quantity);

          case 24:
            response.status(_statuscodes.SUCCESS_MODIFICATION).end();
            _context3.next = 30;
            break;

          case 27:
            _context3.prev = 27;
            _context3.t0 = _context3["catch"](2);
            next(_context3.t0);

          case 30:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 27]]);
  }));

  return function updateCartItem(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var addACartItem = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(request, response, next) {
    var cartid, _request$body, productid, skuid, quantity, inventoryQuery, _inventoryQuery$rows$2, inventoryquantity, inventorylive, cartItemQuery;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            cartid = request.params.cartid;
            _request$body = request.body, productid = _request$body.productid, skuid = _request$body.skuid, quantity = _request$body.quantity;
            /**
             * check if the product has enough quantity left
             */

            _context4.prev = 2;
            _context4.next = 5;
            return _crud.InventoryCRUD.getAmount(skuid);

          case 5:
            inventoryQuery = _context4.sent;
            (0, _validate.checkResults)(inventoryQuery, _statuscodes.NOT_FOUND, "Not found");
            _inventoryQuery$rows$2 = inventoryQuery.rows[0], inventoryquantity = _inventoryQuery$rows$2.inventoryquantity, inventorylive = _inventoryQuery$rows$2.inventorylive; //Check for inventory amounts

            if (!(inventoryquantity === 0)) {
              _context4.next = 12;
              break;
            }

            throw new _errors.ErrorHandler(_statuscodes.ERROR, "Product is out of stock");

          case 12:
            if (inventorylive) {
              _context4.next = 14;
              break;
            }

            throw new _errors.ErrorHandler(_statuscodes.ERROR, "Product is not live");

          case 14:
            _context4.next = 16;
            return _crud.CartItemCRUD.createOne(cartid, productid, skuid, quantity);

          case 16:
            cartItemQuery = _context4.sent;
            response.status(_statuscodes.SUCCESS).json({
              message: "Success",
              item: {
                id: cartItemQuery.rows[0].cartid
              }
            });
            _context4.next = 23;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](2);
            next(_context4.t0);

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 20]]);
  }));

  return function addACartItem(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var deleteCartItem = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(request, response, next) {
    var _request$params2, cartid, skuid, removeQuery;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _request$params2 = request.params, cartid = _request$params2.cartid, skuid = _request$params2.skuid;
            /**
             * get items in cart
             */

            _context5.prev = 1;
            _context5.next = 4;
            return _crud.CartItemCRUD.removeOne(cartid, skuid);

          case 4:
            removeQuery = _context5.sent;
            (0, _validate.checkResults)(removeQuery, _statuscodes.NOT_FOUND, "Could not find cart item");
            response.status(_statuscodes.SUCCESS_MODIFICATION).end();
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](1);
            next(_context5.t0);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 9]]);
  }));

  return function deleteCartItem(_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

var CartItemController = {
  addACartItem: addACartItem,
  getAllItems: getAllItems,
  updateCartItem: updateCartItem,
  deleteCartItem: deleteCartItem
};
var _default = CartItemController;
exports["default"] = _default;
//# sourceMappingURL=cartitems.js.map