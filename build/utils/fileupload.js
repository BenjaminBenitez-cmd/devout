"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.storage = void 0;

var _path = _interopRequireDefault(require("path"));

var _multer = _interopRequireDefault(require("multer"));

// Set Storage Engine
var storage = _multer["default"].diskStorage({
  destination: "./src/public/uploads/",
  filename: function filename(request, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + _path["default"].extname(file.originalname));
  }
});

exports.storage = storage;
var upload = (0, _multer["default"])({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: function fileFilter(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("myImage");
exports.upload = upload;

function checkFileType(file, cb) {
  //Allowed ext
  var filetypes = /jpeg|jpg|png|gif/; //check ext

  var extname = filetypes.test(_path["default"].extname(file.originalname).toLowerCase());
  var mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: images only");
  }
}
//# sourceMappingURL=fileupload.js.map