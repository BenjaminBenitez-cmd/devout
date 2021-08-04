"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _statuscodes = require("../../constants/statuscodes");

var _option = require("../../database/crud/option.crud");

var _validate = require("../../utils/validate");

var addAValue = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
    var _request$params, productid, optionid, name, valueQuery;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _request$params = request.params, productid = _request$params.productid, optionid = _request$params.optionid;
            name = request.body.name;
            _context.prev = 2;
            _context.next = 5;
            return _option.ProductOptionsCRUD.values.createOne(name, productid, optionid);

          case 5:
            valueQuery = _context.sent;
            (0, _validate.checkResults)(valueQuery, _statuscodes.ERROR, "Unable to add option");
            response.status(_statuscodes.SUCCESS).json({
              message: "Success",
              value: {
                id: valueQuery.rows[0].valueid,
                name: name
              }
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            next(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));

  return function addAValue(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getValues = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response, next) {
    var optionid, valueQuery, values;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            optionid = request.params.optionid;
            _context2.prev = 1;
            _context2.next = 4;
            return _option.ProductOptionsCRUD.values.getMany(optionid);

          case 4:
            valueQuery = _context2.sent;

            if (valueQuery.rows.length > 0) {
              values = valueQuery.rows.map(function (node) {
                return {
                  id: node.valueid,
                  optionid: optionid,
                  name: node.valuename
                };
              });
            }

            response.status(_statuscodes.SUCCESS).json({
              message: "success",
              values: values
            });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            next(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));

  return function getValues(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var removeAValue = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request, response, next) {
    var valueid;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            valueid = request.params.valueid;
            _context3.prev = 1;
            _context3.next = 4;
            return _option.ProductOptionsCRUD.values.removeOne(valueid);

          case 4:
            response.status(_statuscodes.SUCCESS_MODIFICATION).send("Successfully removed value");
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

  return function removeAValue(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var OptionValueControllers = {
  addAValue: addAValue,
  removeAValue: removeAValue,
  getValues: getValues
};
var _default = OptionValueControllers;
exports["default"] = _default;
//# sourceMappingURL=optionValues.js.map