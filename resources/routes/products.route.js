const express = require("express");
const { getOptions, deleteAnOption } = require("../controllers/options");
const { getValues } = require("../controllers/OptionValues");
const router = express.Router({ mergeParams: true });
const {
  getAllProducts,
  addAProduct,
  getAProduct,
  deleteAProduct,
  updateAProduct,
} = require("../controllers/products");
const {
  createAVariant,
  getAVariant,
  updateAVariant,
} = require("../controllers/variant");

//product/variants
router
  .route("/variants")
  .post(createAVariant)
  .get(getAVariant)
  .patch(updateAVariant);

//product/options
router.route("/:id/options").get(getOptions).delete(deleteAnOption);
router.route("/:id/options/:optionid/values").get(getValues);

route.route();

//product/
router.route("/").get(getAllProducts).post(addAProduct).patch(updateAProduct);

router.route("/:id").get(getAProduct).delete(deleteAProduct);

module.exports.productRouter = router;
