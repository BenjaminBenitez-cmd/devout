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

var _fileupload = require("../../utils/fileupload");

var _image = require("../services/image.service");

var _fs = _interopRequireDefault(require("fs"));

var uploadAnImage = function uploadAnImage(req, res, next) {
  try {
    (0, _fileupload.upload)(req, res, /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err) {
        var response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!err) {
                  _context.next = 4;
                  break;
                }

                res.status(_statuscodes.ERROR).end("Unable to upload");
                _context.next = 9;
                break;

              case 4:
                _context.next = 6;
                return (0, _image.uploadToCloudinary)(req.file.path);

              case 6:
                response = _context.sent;

                _fs["default"].unlinkSync(req.file.path);

                res.status(_statuscodes.SUCCESS).json({
                  message: "Success",
                  image: {
                    path: response
                  }
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  } catch (err) {
    next(err);
  }
};

var deleteAnImage = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _crud.ImageCRUD.deleteOne(request.params.imageid);

          case 3:
            response.status(_statuscodes.SUCCESS_MODIFICATION).end();
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));

  return function deleteAnImage(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var ImageControllers = {
  uploadAnImage: uploadAnImage,
  deleteAnImage: deleteAnImage
};
var _default = ImageControllers;
exports["default"] = _default;
//# sourceMappingURL=images.js.map