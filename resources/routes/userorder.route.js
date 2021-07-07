const express = require("express");
const { protectUser } = require("../controllers/authorization");
const { getAllUserOrders, createOrder } = require("../controllers/orders");

const router = express.Router();

//user orders
router
  .route("/")
  .get(protectUser, getAllUserOrders)
  .post(protectUser, createOrder);

module.exports.userOrderRouter = router;
