"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouter = void 0;

var _express = require("express");

var _authorization = _interopRequireDefault(require("../controllers/authorization"));

var router = (0, _express.Router)(); //User signin

router.route("/signin").post(_authorization["default"].signInAUser); //User register

router.route("/signup").post(_authorization["default"].createAUser); //User Validation

router.route("/validate").post(_authorization["default"].signupAuthentication);
var userRouter = router;
exports.userRouter = userRouter;
//# sourceMappingURL=user.route.js.map