const express = require("express");

const {
  getCategoriesForProduct,
  addCategoryToProduct,
  removeCategoryFromProduct,
} = require("../controllers/categories");
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
} = require("../controllers/optionValues");
const router = express.Router({ mergeParams: true });
const {
  getAllProducts,
  addAProduct,
  getAProduct,
  deleteAProduct,
  updateAProduct,
} = require("../controllers/products");
const {
  getAVariant,
  updateAVariant,
  deleteAVariant,
  getAllVariants,
  createAVariant,
} = require("../controllers/variant");

router
  .route("/:productid/variants")
  .get(getAllVariants)
  .post(getAllVariants, createAVariant);

router
  .route("/:productid/variants/:skuid")
  .get(getAVariant)
  .patch(updateAVariant)
  .delete(deleteAVariant);

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

//Categories
router.route("/:productid/categories").get(getCategoriesForProduct);
router
  .route("/:productid/categories/:categoryid")
  .put(addCategoryToProduct)
  .delete(removeCategoryFromProduct);

//product/
router.route("/").get(getAllProducts).post(addAProduct).patch(updateAProduct);

router.route("/:id").get(getAProduct).delete(deleteAProduct);

module.exports.productRouter = router;
