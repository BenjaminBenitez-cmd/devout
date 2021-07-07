import { Router } from "express";
import OrderControllers from "../controllers/orders";
const router = Router();

router.route("/").get(OrderControllers.getAllOrders);

router.route("/:orderid").get().delete();

module.exports.orderRouter = router;
