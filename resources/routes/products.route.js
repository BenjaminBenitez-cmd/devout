const express = require("express");
const {
  getOptions,
  deleteAnOption,
  addAnOption,
  updateAnOption,
} = require("../controllers/options");
const {
  getValues,
  addAValue,
  removeAValue,
} = require("../controllers/OptionValues");
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

//product options
router.route("/:productid/options").get(getOptions).post(addAnOption);
router
  .route("/:productid/options/:optionid")
  .delete(deleteAnOption)
  .put(updateAnOption);

//product values
router
  .route("/:productid/options/:optionid/values")
  .get(getValues)
  .post(addAValue);
router
  .route("/:productid/options/:optionid/values/:valueid")
  .delete(removeAValue);

// router.route();

//product/
router.route("/").get(getAllProducts).post(addAProduct).patch(updateAProduct);

router.route("/:id").get(getAProduct).delete(deleteAProduct);

module.exports.productRouter = router;
