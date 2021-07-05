const express = require("express");
const { protectUser } = require("../controllers/authorization");
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
router.route("/").get(protectUser, getACart).post(protectUser, addACart);

router.route("/:cartid").delete(protectUser, deleteACart);

router.route("/:cartid/items").get(protectUser, getAllItems).post(addACartItem);

router
  .route("/:cartid/items/:itemid")
  .put(protectUser, updateCartItem)
  .delete(protectUser, deleteCartItem);

module.exports.cartRouter = router;
