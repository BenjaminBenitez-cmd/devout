import express from "express";

import CategoryControllers from "../controllers/categories";
import ProductControllers from "../controllers/products";
import VariantControllers from "../controllers/variant";
import OptionControllers from "../controllers/options";
import OptionValueControllers from "../controllers/optionValues";

const router = express.Router({ mergeParams: true });

router
  .route("/:productid/variants")
  .get(VariantControllers.getAllVariants)
  .post(VariantControllers.getAllVariants, VariantControllers.createAVariant);

router
  .route("/:productid/variants/:skuid")
  .get(VariantControllers.getAVariant)
  .patch(VariantControllers.updateAVariant)
  .delete(VariantControllers.deleteAVariant);

//product options
router
  .route("/:productid/options")
  .get(OptionControllers.getOptions)
  .post(OptionControllers.addAnOption);
router
  .route("/:productid/options/:optionid")
  .delete(OptionControllers.deleteAnOption)
  .put(OptionControllers.updateAnOption);

//product values
router
  .route("/:productid/options/:optionid/values")
  .get(OptionValueControllers.getValues)
  .post(OptionValueControllers.addAValue);
router
  .route("/:productid/options/:optionid/values/:valueid")
  .delete(OptionValueControllers.removeAValue);

//Categories
router
  .route("/:productid/categories")
  .get(CategoryControllers.getCategoriesForProduct);
router
  .route("/:productid/categories/:categoryid")
  .put(CategoryControllers.addCategoryToProduct)
  .delete(CategoryControllers.removeCategoryFromProduct);

//product/
router
  .route("/")
  .get(ProductControllers.getAllProducts)
  .post(ProductControllers.addAProduct)
  .patch(ProductControllers.updateAProduct);

router
  .route("/:id")
  .get(ProductControllers.getAProduct)
  .delete(ProductControllers.deleteAProduct);

module.exports.productRouter = router;
