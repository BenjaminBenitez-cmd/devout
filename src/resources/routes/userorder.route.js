import { Router } from "express";
import AuthControllers from "../controllers/authorization";
import OrderControllers from "../controllers/orders";

const router = Router();

//user orders
router
  .route("/")
  .get(AuthControllers.protectUser, OrderControllers.getAllUserOrders)
  .post(AuthControllers.protectUser, OrderControllers.createOrder);

module.exports.userOrderRouter = router;
