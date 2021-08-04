"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleError = exports.ErrorHandler = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ErrorHandler = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(ErrorHandler, _Error);

  var _super = _createSuper(ErrorHandler);

  function ErrorHandler(statusCode, message) {
    var _this;

    (0, _classCallCheck2["default"])(this, ErrorHandler);
    _this = _super.call(this);
    _this.statusCode = statusCode;
    _this.message = message;
    return _this;
  }

  return ErrorHandler;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

exports.ErrorHandler = ErrorHandler;

var handleError = function handleError(err, res) {
  var statusCode = err.statusCode,
      message = err.message;

  if (statusCode === undefined) {
    return res.status(500).send({
      status: "error",
      statusCode: 500,
      message: "Opps, An error occured"
    });
  }

  res.status(statusCode).send({
    status: "error",
    statusCode: statusCode,
    message: message
  });
};

exports.handleError = handleError;
//# sourceMappingURL=errors.js.map