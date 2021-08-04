"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _crud = require("../../database/crud");

var _validate = require("../../utils/validate");

var _statuscodes = require("../../constants/statuscodes");

var addACategory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
    var name, categoryQuery, _categoryQuery$rows$, categoryname, categoryid;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = request.body.name;
            _context.prev = 1;
            _context.next = 4;
            return _crud.CategoriesCRUD.createOne(name);

          case 4:
            categoryQuery = _context.sent;
            (0, _validate.checkResults)(categoryQuery, _statuscodes.ERROR, "Unable to create");
            _categoryQuery$rows$ = categoryQuery.rows[0], categoryname = _categoryQuery$rows$.categoryname, categoryid = _categoryQuery$rows$.categoryid;
            response.status(_statuscodes.SUCCESS).json({
              message: "Success",
              category: {
                id: categoryid,
                name: categoryname
              }
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            next(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));

  return function addACategory(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var updateACategory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response, next) {
    var _request$body, id, name;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _request$body = request.body, id = _request$body.id, name = _request$body.name;
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _crud.CategoriesCRUD)(id, name);

          case 4:
            response(_statuscodes.SUCCESS_MODIFICATION).send("Successfully updated category");
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            next(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 7]]);
  }));

  return function updateACategory(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var getAllCategories = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_, response, next) {
    var categoryQuery, mapKeys;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _crud.CategoriesCRUD.getMany();

          case 3:
            categoryQuery = _context3.sent;
            (0, _validate.checkResults)(categoryQuery, _statuscodes.NOT_FOUND, "Could not find categories");
            mapKeys = categoryQuery.rows.map(function (node) {
              return {
                id: node.categoryid,
                name: node.categoryname
              };
            });
            response.status(_statuscodes.SUCCESS).json({
              message: "Success",
              categories: mapKeys
            });
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function getAllCategories(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var deleteACategory = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(request, response, next) {
    var id, deleteQuery;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = request.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _crud.CategoriesCRUD.removeOne(id);

          case 4:
            deleteQuery = _context4.sent;
            (0, _validate.checkResults)(deleteQuery, _statuscodes.NOT_FOUND, "Unable to find Category");
            response.status(_statuscodes.SUCCESS_MODIFICATION).send("Deleted Category");
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            next(_context4.t0);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  }));

  return function deleteACategory(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var addCategoryToProduct = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(request, response, next) {
    var _request$params, productid, categoryid;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _request$params = request.params, productid = _request$params.productid, categoryid = _request$params.categoryid;
            _context5.prev = 1;
            _context5.next = 4;
            return _crud.ProductCatCRUD.createOne(productid, categoryid);

          case 4:
            response.status(_statuscodes.SUCCESS_MODIFICATION).send("Successfully added category to product");
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

  return function addCategoryToProduct(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var removeCategoryFromProduct = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(request, response, next) {
    var _request$params2, productid, categoryid;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _request$params2 = request.params, productid = _request$params2.productid, categoryid = _request$params2.categoryid;
            _context6.prev = 1;
            _context6.next = 4;
            return _crud.ProductCatCRUD.removeOne(productid, categoryid);

          case 4:
            response.status(_statuscodes.SUCCESS_MODIFICATION).send("Successfully removed category from product");
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](1);
            next(_context6.t0);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 7]]);
  }));

  return function removeCategoryFromProduct(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

var getCategoriesForProduct = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(request, response, next) {
    var productid, _yield$ProductCatCRUD, rows, categories;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            productid = request.params.productid;
            _context7.prev = 1;
            _context7.next = 4;
            return _crud.ProductCatCRUD.getMany(productid);

          case 4:
            _yield$ProductCatCRUD = _context7.sent;
            rows = _yield$ProductCatCRUD.rows;

            if (rows.length > 0) {
              rows.map(function (node) {
                return {
                  id: node.categoryid,
                  name: node.categoryname
                };
              });
            }

            response.status(_statuscodes.SUCCESS).json({
              message: "success",
              categories: categories
            });
            _context7.next = 13;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](1);
            next(_context7.t0);

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 10]]);
  }));

  return function getCategoriesForProduct(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

var CategoryControllers = {
  addACategory: addACategory,
  updateACategory: updateACategory,
  deleteACategory: deleteACategory,
  getAllCategories: getAllCategories,
  removeCategoryFromProduct: removeCategoryFromProduct,
  addCategoryToProduct: addCategoryToProduct,
  getCategoriesForProduct: getCategoriesForProduct
};
var _default = CategoryControllers;
exports["default"] = _default;
//# sourceMappingURL=categories.js.map