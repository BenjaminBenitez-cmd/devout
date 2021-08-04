"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _crud = require("../../database/crud");

var _errors = require("../../utils/errors");

var _statuscodes = require("../../constants/statuscodes");

var _validate = require("../../utils/validate");

var addACart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
    var id, total, cartQuery;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = request.user.id;
            total = request.body.total;

            if (total == null) {
              total = 0;
            }
            /**
             * check if a cart already exists
             * create a session cart for the user
             * insert the id and quantity if provided
             */


            _context.prev = 3;
            _context.next = 6;
            return _crud.CartCRUD.getOneByUserID(id);

          case 6:
            cartQuery = _context.sent;

            if (!(cartQuery.rows.length > 0)) {
              _context.next = 9;
              break;
            }

            throw new _errors.ErrorHandler(_statuscodes.ERROR, "A cart for this user already exists");

          case 9:
            _context.next = 11;
            return _crud.CartCRUD.createOne(id, total);

          case 11:
            response.status(_statuscodes.SUCCESS).end();
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            next(_context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 14]]);
  }));

  return function addACart(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getACart = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request, response, next) {
    var id, cartQuery, cart, _cartQuery, cartItemsQuery, cartItems;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = request.user.id;
            /**
             * use the user's id to get cart
             * if the user has a cart use it to fetch cart items
             */

            _context3.prev = 1;
            _context3.next = 4;
            return _crud.CartCRUD.getOneByUserID(id);

          case 4:
            cartQuery = _context3.sent;

            if (!(cartQuery.rows.length === 0)) {
              _context3.next = 12;
              break;
            }

            _context3.next = 8;
            return _crud.CartCRUD.createOne(id, 0);

          case 8:
            _cartQuery = _context3.sent;
            cart = _cartQuery.rows[0];
            _context3.next = 13;
            break;

          case 12:
            cart = cartQuery.rows[0];

          case 13:
            _context3.next = 15;
            return _crud.CartItemCRUD.getManyBySessionID(cart.sessionid);

          case 15:
            cartItemsQuery = _context3.sent;
            cartItems = [];

            if (!(cartItemsQuery.rows.length > 0)) {
              _context3.next = 21;
              break;
            }

            _context3.next = 20;
            return Promise.all(cartItemsQuery.rows.length > 0 && cartItemsQuery.rows.map( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(item) {
                var products, images;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _crud.ProductCRUD.getOneByID(item.productid);

                      case 2:
                        products = _context2.sent;
                        _context2.next = 5;
                        return _crud.ImageCRUD.getManyByProductAndSKU(item.productid, item.skuid);

                      case 5:
                        images = _context2.sent;
                        return _context2.abrupt("return", {
                          id: item.cartid,
                          productid: item.productid,
                          skuid: item.skuid,
                          name: products.rows[0].productname,
                          images: images.rows,
                          price: products.rows[0].productprice,
                          quantity: item.quantity
                        });

                      case 7:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x7) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 20:
            cartItems = _context3.sent;

          case 21:
            response.status(_statuscodes.SUCCESS).json({
              message: "Success",
              cart: {
                id: cart.sessionid,
                items: cartItems
              }
            });
            _context3.next = 27;
            break;

          case 24:
            _context3.prev = 24;
            _context3.t0 = _context3["catch"](1);
            next(_context3.t0);

          case 27:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 24]]);
  }));

  return function getACart(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteACart = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(request, response, next) {
    var id, cartid, removequery;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = request.user.id;
            cartid = request.params.cartid;
            _context4.prev = 2;
            _context4.next = 5;
            return _crud.CartCRUD.removeOne(cartid, id);

          case 5:
            removequery = _context4.sent;
            (0, _validate.checkResults)(removequery, _statuscodes.NOT_FOUND, "Could not find cart");
            response.status(_statuscodes.SUCCESS_MODIFICATION).end();
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](2);
            next(_context4.t0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 10]]);
  }));

  return function deleteACart(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var CartControllers = {
  addACart: addACart,
  getACart: getACart,
  deleteACart: deleteACart
};
var _default = CartControllers;
exports["default"] = _default;
//# sourceMappingURL=cart.js.map