import { Router } from "express";
import AuthControllers from "../controllers/authorization";

const router = Router();

//User signin
router.route("/signin").post(AuthControllers.signInAUser);

//User register
router.route("/signup").post(AuthControllers.createAUser);

//User Validation
router.route("/validate").post(AuthControllers.signupAuthentication);

export const userRouter = router;
