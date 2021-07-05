const express = require("express");
const {
  signInAUser,
  createAUser,
  signupAuthentication,
  protectUser,
} = require("../controllers/authorization");
const { getAllUserOrders, createOrder } = require("../controllers/orders");

const router = express.Router();

//User signin
router.route("/signin").post(signInAUser);

//User register
router.route("/signup").post(createAUser);

//User Validation
router.route("/validate").post(signupAuthentication);

//user orders
router
  .route("/orders")
  .get(protectUser, getAllUserOrders)
  .post(protectUser, createOrder);

module.exports.UserRouter = router;
