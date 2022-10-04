import express from "express";
import AddressControllers from "../controllers/addresses";
import AuthControllers from "../controllers/authorization";
const router = express.Router();

router
  .route("/")
  .get(AuthControllers.protectUser, AddressControllers.getAddress)
  .put(AuthControllers.protectUser, AddressControllers.updateAddress)
  .post(AuthControllers.protectUser, AddressControllers.addAAddress);

export const addressRouter = router;
