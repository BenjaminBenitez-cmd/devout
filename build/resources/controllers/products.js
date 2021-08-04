"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _statuscodes = require("../../constants/statuscodes");

var _crud = require("../../database/crud");

var _errors = require("../../utils/errors");

var _product = _interopRequireDefault(require("../services/product.service"));

var addAProduct = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
    var _request$body, skucode, name, price, cartdesc, shortdesc, longdesc, discountid, images, quantity, newProduct;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // if (!request.body) next(new ErrorHandler(400, "Request Body Missing"));
            _request$body = request.body, skucode = _request$body.skucode, name = _request$body.name, price = _request$body.price, cartdesc = _request$body.cartdesc, shortdesc = _request$body.shortdesc, longdesc = _request$body.longdesc, discountid = _request$body.discountid, images = _request$body.images, quantity = _request$body.quantity;
            _context.prev = 1;
            _context.next = 4;
            return _product["default"].addAProduct(skucode, name, price, cartdesc, shortdesc, longdesc, discountid, images, quantity);

          case 4:
            newProduct = _context.sent;
            response.status(_statuscodes.SUCCESS).json({
              status: "Success",
              product: newProduct
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            next(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function addAProduct(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getAllProducts = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response, next) {
    var productsAndSales;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _product["default"].getAllProducts();

          case 3:
            productsAndSales = _context2.sent;
            response.status(_statuscodes.SUCCESS).json({
              status: "success",
              results: productsAndSales.length,
              products: productsAndSales
            });
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getAllProducts(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var getAProduct = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request, response, next) {
    var id, product;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = request.params.id;
            if (!id) new _errors.ErrorHandler(_statuscodes.NOT_AUTHORIZED, "Missing id");
            _context3.prev = 2;
            _context3.next = 5;
            return _product["default"].getAProduct(id);

          case 5:
            product = _context3.sent;
            response.status(_statuscodes.SUCCESS).json({
              status: "Success",
              product: product
            });
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](2);
            next(_context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 9]]);
  }));

  return function getAProduct(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var updateAProduct = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(request, response, next) {
    var _request$body2, id, skuid, name, price, shortdescription, longdescription, images, quantity, product;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _request$body2 = request.body, id = _request$body2.id, skuid = _request$body2.skuid, name = _request$body2.name, price = _request$body2.price, shortdescription = _request$body2.shortdescription, longdescription = _request$body2.longdescription, images = _request$body2.images, quantity = _request$body2.quantity;
            _context4.prev = 1;
            _context4.next = 4;
            return _product["default"].updateAProduct(id, skuid, name, price, shortdescription, longdescription, images, quantity);

          case 4:
            product = _context4.sent;
            response.status(_statuscodes.SUCCESS_MODIFICATION).json({
              status: "Success",
              product: {
                id: id,
                skuid: skuid,
                updatedimages: product.imagesQuery
              }
            });
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            next(_context4.t0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function updateAProduct(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var deleteAProduct = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(request, response, next) {
    var id;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = request.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _crud.ProductCRUD.removeOne(id);

          case 4:
            response.status(_statuscodes.SUCCESS_MODIFICATION).send("Success");
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](1);
            next(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 7]]);
  }));

  return function deleteAProduct(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var ProductControllers = {
  addAProduct: addAProduct,
  getAllProducts: getAllProducts,
  getAProduct: getAProduct,
  updateAProduct: updateAProduct,
  deleteAProduct: deleteAProduct
};
var _default = ProductControllers;
exports["default"] = _default;
//# sourceMappingURL=products.js.map