const express = require("express");
const {
  addACategory,
  getAllCategories,
  updateACategory,
  deleteACategory,
} = require("../controllers/categories");
const router = express.Router();

router.route("/").post(addACategory).get(getAllCategories).put(updateACategory);

router.route("/:id").delete(deleteACategory);

module.exports.categoryRouter = router;
