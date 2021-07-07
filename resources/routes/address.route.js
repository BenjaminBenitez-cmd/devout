const express = require("express");
const {
  getAddress,
  updateAddress,
  addAAddress,
} = require("../controllers/addresses");
const { protectUser } = require("../controllers/authorization");
const router = express.Router();

router
  .route("/")
  .get(protectUser, getAddress)
  .put(protectUser, updateAddress)
  .post(protectUser, addAAddress);

module.exports.AddressRouter = router;
