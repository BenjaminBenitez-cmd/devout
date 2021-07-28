import { Router } from "express";
import AuthControllers from "../controllers/authorization";
import OrderControllers from "../controllers/orders";
import PaymentControllers from "../controllers/payments";

const router = Router();

//user orders
router
  .route("/")
  .get(AuthControllers.protectUser, OrderControllers.getAllUserOrders)
  .post(AuthControllers.protectUser, OrderControllers.createOrder);

export const userOrderRouter = router;
