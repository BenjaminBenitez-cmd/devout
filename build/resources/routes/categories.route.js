"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryRouter = void 0;

var _express = require("express");

var _authorization = _interopRequireDefault(require("../controllers/authorization"));

var _categories = _interopRequireDefault(require("../controllers/categories"));

var router = (0, _express.Router)();
router.route("/").post(_authorization["default"].protectAdmin, _categories["default"].addACategory).get(_categories["default"].getAllCategories).put(_authorization["default"].protectAdmin, _categories["default"].updateACategory);
router.route("/:id")["delete"](_categories["default"].deleteACategory);
var categoryRouter = router;
exports.categoryRouter = categoryRouter;
//# sourceMappingURL=categories.route.js.map