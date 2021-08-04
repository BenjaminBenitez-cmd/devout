"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _statuscodes = require("../../constants/statuscodes");

var _validate = require("../../utils/validate");

var _crud = require("../../database/crud");

var _errors = require("../../utils/errors");

var addAAddress = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
    var id, _request$body, city, state, phone, country, address1, address2, alreadyHasAddress, addressQuery;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = request.user.id;
            _request$body = request.body, city = _request$body.city, state = _request$body.state, phone = _request$body.phone, country = _request$body.country, address1 = _request$body.address1, address2 = _request$body.address2;
            _context.prev = 2;
            _context.next = 5;
            return _crud.AddressCRUD.getOneByUserID(id);

          case 5:
            alreadyHasAddress = _context.sent;

            if (!(alreadyHasAddress.rows.length >= 1)) {
              _context.next = 8;
              break;
            }

            throw new _errors.ErrorHandler(_statuscodes.NOT_FOUND, "user already has an address");

          case 8:
            _context.next = 10;
            return _crud.AddressCRUD.createOne(id, city, state, phone, country, address1, address2);

          case 10:
            addressQuery = _context.sent;
            response.status(_statuscodes.SUCCESS).json({
              message: "Success",
              address: {
                id: addressQuery.rows[0].addressid
              }
            });
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](2);
            next(_context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 14]]);
  }));

  return function addAAddress(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var updateAddress = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response, next) {
    var id, _request$body2, city, state, phone, country, address1, address2;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = request.user.id;
            _request$body2 = request.body, city = _request$body2.city, state = _request$body2.state, phone = _request$body2.phone, country = _request$body2.country, address1 = _request$body2.address1, address2 = _request$body2.address2;
            _context2.prev = 2;
            _context2.next = 5;
            return _crud.AddressCRUD.updateOne(id, city, state, phone, country, address1, address2);

          case 5:
            response.status(_statuscodes.SUCCESS_MODIFICATION).end();
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            next(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));

  return function updateAddress(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var getAddress = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request, response, next) {
    var id, addressQuery, address;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = request.user.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _crud.AddressCRUD.getOneByUserID(id);

          case 4:
            addressQuery = _context3.sent;
            address = null; //reassign address values if available

            if (addressQuery.rows.length === 1) {
              address = {
                id: addressQuery.rows[0].addressid,
                city: addressQuery.rows[0].addresscity,
                state: addressQuery.rows[0].addressstate,
                phone: addressQuery.rows[0].addressphone,
                country: addressQuery.rows[0].addresscountry,
                address1: addressQuery.rows[0].address1,
                address2: addressQuery.rows[0].address2
              };
            }

            response.status(_statuscodes.SUCCESS).json({
              message: "success",
              address: address
            });
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            next(_context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 10]]);
  }));

  return function getAddress(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var AddressControllers = {
  addAAddress: addAAddress,
  updateAddress: updateAddress,
  getAddress: getAddress
};
var _default = AddressControllers;
exports["default"] = _default;
//# sourceMappingURL=addresses.js.map