import express from "express";
import AuthControllers from "../controllers/authorization";
import CartControllers from "../controllers/cart";
import CartItemController from "../controllers/cartitems";

const router = express.Router();

//get
router
  .route("/")
  .get(AuthControllers.protectUser, CartControllers.getACart)
  .post(AuthControllers.protectUser, CartControllers.addACart);

router
  .route("/:cartid")
  .delete(AuthControllers.protectUser, CartControllers.deleteACart);

router
  .route("/:cartid/items")
  .get(AuthControllers.protectUser, CartItemController.getAllItems)
  .post(CartItemController.addACartItem);

router
  .route("/:cartid/items/:skuid")
  .put(AuthControllers.protectUser, CartItemController.updateCartItem)
  .delete(AuthControllers.protectUser, CartItemController.deleteCartItem);

export const cartRouter = router;
