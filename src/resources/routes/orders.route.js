import { Router } from "express";
import OrderControllers from "../controllers/orders";
const router = Router();

router.route("/").get(OrderControllers.getAllOrders);

router.route("/:orderid").get(OrderControllers.getAnOrder).delete();

export const orderRouter = router;
