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

var _validate = require("../../utils/validate");

var addAnOption = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
    var productid, name, optionQuery, _optionQuery$rows$, optionname, optionid;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            productid = request.params.productid;
            name = request.body.name;
            _context.prev = 2;
            _context.next = 5;
            return _crud.ProductOptionsCRUD.createOne(productid, name);

          case 5:
            optionQuery = _context.sent;
            (0, _validate.checkResults)(optionQuery, _statuscodes.ERROR, "Value already exists");
            _optionQuery$rows$ = optionQuery.rows[0], optionname = _optionQuery$rows$.optionname, optionid = _optionQuery$rows$.optionid;
            response.status(_statuscodes.SUCCESS).json({
              message: "success",
              option: {
                id: optionid,
                name: optionname
              }
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            next(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 11]]);
  }));

  return function addAnOption(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var updateAnOption = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response, next) {
    var _request$body, id, name;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _request$body = request.body, id = _request$body.id, name = _request$body.name;
            _context2.prev = 1;
            _context2.next = 4;
            return _crud.ProductOptionsCRUD.updateOne(id, name);

          case 4:
            response.status(_statuscodes.SUCCESS_MODIFICATION).send("Successfully created an option");
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

  return function updateAnOption(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteAnOption = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request, response, next) {
    var optionid;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            optionid = request.params.optionid;
            _context3.prev = 1;
            _context3.next = 4;
            return _crud.ProductOptionsCRUD.removeOne(optionid);

          case 4:
            response.status(_statuscodes.SUCCESS_MODIFICATION).send("Successfully deleted option");
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](1);
            next(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 7]]);
  }));

  return function deleteAnOption(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}(); //Option with productid


var getOptions = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(request, response, next) {
    var productid, optionQuery, mapOptions;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            productid = request.params.productid;
            _context4.prev = 1;
            _context4.next = 4;
            return _crud.ProductOptionsCRUD.getMany(productid);

          case 4:
            optionQuery = _context4.sent;
            mapOptions = optionQuery.rows.map(function (node) {
              return {
                optionid: node.optionid,
                productid: node.productid,
                name: node.optionname
              };
            });
            response.status(_statuscodes.SUCCESS).json({
              message: "Successfull",
              options: mapOptions
            });
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

  return function getOptions(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var OptionControllers = {
  addAnOption: addAnOption,
  updateAnOption: updateAnOption,
  deleteAnOption: deleteAnOption,
  getOptions: getOptions
};
var _default = OptionControllers;
exports["default"] = _default;
//# sourceMappingURL=options.js.map