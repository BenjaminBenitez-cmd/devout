"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageRouter = void 0;

var _express = require("express");

var _images = _interopRequireDefault(require("../controllers/images"));

var router = (0, _express.Router)();
router.route("/").post(_images["default"].uploadAnImage);
router.route("/:imageid")["delete"](_images["default"].deleteAnImage);
var imageRouter = router;
exports.imageRouter = imageRouter;
//# sourceMappingURL=image.route.js.map