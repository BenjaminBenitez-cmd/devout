const express = require("express");
const { getAllOrders } = require("../controllers/orders");
const router = express.Router();

router.route("/").get(getAllOrders);

router.route("/:orderid").get().delete();

module.exports.OrderRouter = router;
