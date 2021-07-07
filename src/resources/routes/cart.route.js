import express from "express";
import AuthControllers from "../controllers/authorization";

const {
  createACart,
  getACart,
  deleteACart,
  addACart,
} = require("../controllers/cart");
const {
  getAllItems,
  addACartItem,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/carttems");

const router = express.Router();

//get
router
  .route("/")
  .get(AuthControllers.protectUser, getACart)
  .post(AuthControllers.protectUser, addACart);

router.route("/:cartid").delete(AuthControllers.protectUser, deleteACart);

router
  .route("/:cartid/items")
  .get(AuthControllers.protectUser, getAllItems)
  .post(addACartItem);

router
  .route("/:cartid/items/:itemid")
  .put(AuthControllers.protectUser, updateCartItem)
  .delete(AuthControllers.protectUser, deleteCartItem);

module.exports.cartRouter = router;
