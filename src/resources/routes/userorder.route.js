const express = require("express");
import AuthControllers from "../controllers/authorization";
const { getAllUserOrders, createOrder } = require("../controllers/orders");

const router = express.Router();

//user orders
router
  .route("/")
  .get(AuthControllers.protectUser, getAllUserOrders)
  .post(AuthControllers.protectUser, createOrder);

module.exports.userOrderRouter = router;
