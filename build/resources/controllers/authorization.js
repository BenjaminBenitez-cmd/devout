"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _errors = require("../../utils/errors");

var _statuscodes = require("../../constants/statuscodes");

var _admin = require("../../database/crud/admin.crud");

var _user = require("../../database/crud/user.crud");

var _validate = require("../../utils/validate");

var _tokens = _interopRequireDefault(require("../../utils/tokens"));

var _encrypt = _interopRequireDefault(require("../../utils/encrypt"));

var _sendgrid = _interopRequireDefault(require("../services/sendgrid.service"));

var signInAnAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
    var _request$body, username, password, adminQuery, hashedPassword, isPassword, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _request$body = request.body, username = _request$body.username, password = _request$body.password;

            if (!(!username || !password)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", next(new _errors.ErrorHandler(_statuscodes.NOT_AUTHORIZED, "Missing parameters")));

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return _admin.AdminCRUD.getOneByUserName(username);

          case 6:
            adminQuery = _context.sent;
            (0, _validate.checkResults)(adminQuery, _statuscodes.NOT_FOUND, "No User with that name was found");
            hashedPassword = adminQuery.rows[0].adminpassword; //compare two passwords

            _context.next = 11;
            return _encrypt["default"].comparePassword(password, hashedPassword);

          case 11:
            isPassword = _context.sent;

            if (isPassword) {
              _context.next = 14;
              break;
            }

            throw new _errors.ErrorHandler(_statuscodes.NOT_AUTHORIZED, "Invalid username or password");

          case 14:
            _context.next = 16;
            return _tokens["default"].newToken({
              id: adminQuery.rows[0].adminid
            });

          case 16:
            token = _context.sent;
            response.status(_statuscodes.SUCCESS).json({
              message: "Success",
              token: token
            });
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](3);
            next(_context.t0);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 20]]);
  }));

  return function signInAnAdmin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var createAnAdmin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response, next) {
    var _request$body2, username, firstname, lastname, password, hash;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _request$body2 = request.body, username = _request$body2.username, firstname = _request$body2.firstname, lastname = _request$body2.lastname, password = _request$body2.password;

            if (request.body) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", next(new _errors.ErrorHandler(_statuscodes.MISSING_PARAMS, "Please provided the required parameters")));

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return _encrypt["default"].hashPassword(password);

          case 6:
            hash = _context2.sent;

            if (hash) {
              _context2.next = 9;
              break;
            }

            throw new _errors.ErrorHandler(_statuscodes.ERROR, "Opps something went wrong");

          case 9:
            _context2.next = 11;
            return _admin.AdminCRUD.createOne(username, hash, firstname, lastname);

          case 11:
            response.status(_statuscodes.SUCCESS).json({
              message: "success",
              user: {
                username: username
              }
            });
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](3);
            next(_context2.t0);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 14]]);
  }));

  return function createAnAdmin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var protectAdmin = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request, response, next) {
    var token, _token$split, _token$split2, bearer, jwt, isValid, id, adminQuery;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = request.headers.authorization;

            if (!(token === undefined || token === null)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", next(new _errors.ErrorHandler(_statuscodes.NOT_AUTHORIZED, "Missing Token")));

          case 3:
            //check token format
            if (!token.startsWith("Bearer ")) {
              next(new _errors.ErrorHandler(_statuscodes.NOT_AUTHORIZED, "Invalid Token"));
            }

            _token$split = token.split(" ", 2), _token$split2 = (0, _slicedToArray2["default"])(_token$split, 2), bearer = _token$split2[0], jwt = _token$split2[1];
            _context3.prev = 5;
            _context3.next = 8;
            return _tokens["default"].verifyToken(jwt);

          case 8:
            isValid = _context3.sent;
            id = isValid.id;
            _context3.next = 12;
            return _admin.AdminCRUD.getOneByID(id);

          case 12:
            adminQuery = _context3.sent;
            (0, _validate.checkResults)(adminQuery, _statuscodes.NOT_AUTHORIZED, "Not Authorized");
            request.admin = {
              id: id
            };
            next();
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](5);
            next(_context3.t0);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 18]]);
  }));

  return function protectAdmin(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
/** User authentication methods */


var signInAUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(request, response, next) {
    var _request$body3, email, password, userQuery, hashedPassword, isPassword, token;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _request$body3 = request.body, email = _request$body3.email, password = _request$body3.password;

            if (!(!email || !password)) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", next(new _errors.ErrorHandler(_statuscodes.NOT_AUTHORIZED, "Missing parameters")));

          case 3:
            _context4.prev = 3;
            _context4.next = 6;
            return _user.UsersCRUD.getOneByEmail(email);

          case 6:
            userQuery = _context4.sent;
            (0, _validate.checkResults)(userQuery, _statuscodes.NOT_FOUND, "No User with that name was found");

            if (!(userQuery.rows[0].isverified === false)) {
              _context4.next = 10;
              break;
            }

            throw new _errors.ErrorHandler(_statuscodes.NOT_AUTHORIZED, "Unverified, please try again");

          case 10:
            hashedPassword = userQuery.rows[0].userpassword; //compare two passwords

            _context4.next = 13;
            return _encrypt["default"].comparePassword(password, hashedPassword);

          case 13:
            isPassword = _context4.sent;

            if (isPassword) {
              _context4.next = 16;
              break;
            }

            throw new _errors.ErrorHandler(_statuscodes.NOT_AUTHORIZED, "Invalid username or password");

          case 16:
            _context4.next = 18;
            return _tokens["default"].newToken({
              id: userQuery.rows[0].userid
            });

          case 18:
            token = _context4.sent;
            response.status(_statuscodes.SUCCESS).json({
              message: "Success",
              user: {
                token: token,
                email: email
              }
            });
            _context4.next = 25;
            break;

          case 22:
            _context4.prev = 22;
            _context4.t0 = _context4["catch"](3);
            next(_context4.t0);

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 22]]);
  }));

  return function signInAUser(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var createAUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(request, response, next) {
    var _request$body4, email, password, userQuery, hash, createUserQuery, userid, token;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _request$body4 = request.body, email = _request$body4.email, password = _request$body4.password;

            if (!(email == undefined || password == undefined)) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", next(new _errors.ErrorHandler(_statuscodes.MISSING_PARAMS, "Missing Parameters")));

          case 3:
            _context5.prev = 3;
            _context5.next = 6;
            return _user.UsersCRUD.getOneByEmail(email);

          case 6:
            userQuery = _context5.sent;

            if (!(userQuery.rows.length > 0)) {
              _context5.next = 9;
              break;
            }

            throw new _errors.ErrorHandler(_statuscodes.NOT_AUTHORIZED, "User with that email already exists");

          case 9:
            _context5.next = 11;
            return _encrypt["default"].hashPassword(password);

          case 11:
            hash = _context5.sent;

            if (hash) {
              _context5.next = 14;
              break;
            }

            throw new _errors.ErrorHandler(_statuscodes.ERROR, "Something went wrong");

          case 14:
            _context5.next = 16;
            return _user.UsersCRUD.createOne(email, null, null, hash);

          case 16:
            createUserQuery = _context5.sent;
            (0, _validate.checkResults)(createUserQuery, _statuscodes.ERROR, "Unable to create user");
            userid = createUserQuery.rows[0].userid; //generate token from user id

            _context5.next = 21;
            return _tokens["default"].newToken({
              id: userid
            });

          case 21:
            token = _context5.sent;
            _context5.next = 24;
            return _sendgrid["default"].sendVerificationMail(email, null, "".concat(process.env.CLIENT_URL, "/verification/").concat(token));

          case 24:
            _context5.next = 26;
            return _user.UsersCRUD.updateVerificationStatus(userid, false, token);

          case 26:
            response.status(_statuscodes.SUCCESS).json({
              message: "success",
              user: {
                email: email
              }
            });
            _context5.next = 32;
            break;

          case 29:
            _context5.prev = 29;
            _context5.t0 = _context5["catch"](3);
            next(_context5.t0);

          case 32:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 29]]);
  }));

  return function createAUser(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var signupAuthentication = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(request, response, next) {
    var token, isValid;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (request.body.token) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt("return", next(new _errors.ErrorHandler(_statuscodes.MISSING_PARAMS, "No token")));

          case 2:
            token = request.body.token;
            _context6.prev = 3;
            _context6.next = 6;
            return _tokens["default"].verifyToken(token);

          case 6:
            isValid = _context6.sent;

            if (isValid) {
              _context6.next = 9;
              break;
            }

            throw new _errors.ErrorHandler(_statuscodes.NOT_AUTHORIZED, "Unable to authorize");

          case 9:
            _context6.next = 11;
            return _user.UsersCRUD.updateVerificationStatus(isValid.id, true, null);

          case 11:
            response.status(_statuscodes.SUCCESS_MODIFICATION).end();
            _context6.next = 17;
            break;

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](3);
            next(_context6.t0);

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 14]]);
  }));

  return function signupAuthentication(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

var protectUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(request, response, next) {
    var token, _token$split3, _token$split4, bearer, jwt, isValid, id, userQuery;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            token = request.headers.authorization;

            if (!(token === undefined || token === null)) {
              _context7.next = 3;
              break;
            }

            return _context7.abrupt("return", next(new _errors.ErrorHandler(_statuscodes.NOT_AUTHORIZED, "Missing Token")));

          case 3:
            //check token format
            if (!token.startsWith("Bearer ")) {
              next(new _errors.ErrorHandler(_statuscodes.NOT_AUTHORIZED, "Invalid Token"));
            }

            _token$split3 = token.split(" ", 2), _token$split4 = (0, _slicedToArray2["default"])(_token$split3, 2), bearer = _token$split4[0], jwt = _token$split4[1];
            _context7.prev = 5;
            _context7.next = 8;
            return _tokens["default"].verifyToken(jwt);

          case 8:
            isValid = _context7.sent;
            id = isValid.id;
            _context7.next = 12;
            return _user.UsersCRUD.getOneByID(id);

          case 12:
            userQuery = _context7.sent;
            (0, _validate.checkResults)(userQuery, _statuscodes.NOT_AUTHORIZED, "Not Authorized");
            request.user = {
              id: id
            };
            next();
            _context7.next = 21;
            break;

          case 18:
            _context7.prev = 18;
            _context7.t0 = _context7["catch"](5);
            next(_context7.t0);

          case 21:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[5, 18]]);
  }));

  return function protectUser(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

var AuthControllers = {
  signInAnAdmin: signInAnAdmin,
  createAnAdmin: createAnAdmin,
  protectAdmin: protectAdmin,
  createAUser: createAUser,
  signupAuthentication: signupAuthentication,
  signInAUser: signInAUser,
  protectUser: protectUser
};
var _default = AuthControllers;
exports["default"] = _default;
//# sourceMappingURL=authorization.js.map