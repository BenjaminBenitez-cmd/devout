import express from "express";

import CategoryControllers from "../controllers/categories";
import ProductControllers from "../controllers/products";
import VariantControllers from "../controllers/variant";
import OptionControllers from "../controllers/options";
import OptionValueControllers from "../controllers/optionValues";
import AuthControllers from "../controllers/authorization";

const router = express.Router({ mergeParams: true });

router
  .route("/:productid/variants")
  .get(VariantControllers.getAllVariants)
  .post(
    AuthControllers.protectAdmin,
    VariantControllers.getAllVariants,
    VariantControllers.createAVariant
  );

router
  .route("/:productid/variants/:skuid")
  .get(VariantControllers.getAVariant)
  .patch(AuthControllers.protectAdmin, VariantControllers.updateAVariant)
  .delete(AuthControllers.protectAdmin, VariantControllers.deleteAVariant);

//product options
router
  .route("/:productid/options")
  .get(OptionControllers.getOptions)
  .post(AuthControllers.protectAdmin, OptionControllers.addAnOption);
router
  .route("/:productid/options/:optionid")
  .delete(AuthControllers.protectAdmin, OptionControllers.deleteAnOption)
  .put(AuthControllers.protectAdmin, OptionControllers.updateAnOption);

//product values
router
  .route("/:productid/options/:optionid/values")
  .get(OptionValueControllers.getValues)
  .post(AuthControllers.protectAdmin, OptionValueControllers.addAValue);
router
  .route("/:productid/options/:optionid/values/:valueid")
  .delete(AuthControllers.protectAdmin, OptionValueControllers.removeAValue);

//Categories
router
  .route("/:productid/categories")
  .get(CategoryControllers.getCategoriesForProduct);
router
  .route("/:productid/categories/:categoryid")
  .put(AuthControllers.protectAdmin, CategoryControllers.addCategoryToProduct)
  .delete(
    AuthControllers.protectAdmin,
    CategoryControllers.removeCategoryFromProduct
  );

//product/
router
  .route("/")
  .get(ProductControllers.getAllProducts)
  .post(AuthControllers.protectAdmin, ProductControllers.addAProduct)
  .patch(AuthControllers.protectAdmin, ProductControllers.updateAProduct);

router
  .route("/:id")
  .get(ProductControllers.getAProduct)
  .delete(AuthControllers.protectAdmin, ProductControllers.deleteAProduct);

export const productRouter = router;
