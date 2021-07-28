import { Router } from "express";
import PaymentControllers from "../controllers/payments";
const router = Router();

router.route("/intents").post(PaymentControllers.paymentIntent);

router.route("/confirmation").post(PaymentControllers.paymentConfirm);

export const paymentRouter = router;
