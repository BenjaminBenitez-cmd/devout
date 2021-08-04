"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _categories = _interopRequireDefault(require("../controllers/categories"));

var _products = _interopRequireDefault(require("../controllers/products"));

var _variant = _interopRequireDefault(require("../controllers/variant"));

var _options = _interopRequireDefault(require("../controllers/options"));

var _optionValues = _interopRequireDefault(require("../controllers/optionValues"));

var _authorization = _interopRequireDefault(require("../controllers/authorization"));

var router = _express["default"].Router({
  mergeParams: true
});

router.route("/:productid/variants").get(_variant["default"].getAllVariants).post(_authorization["default"].protectAdmin, _variant["default"].getAllVariants, _variant["default"].createAVariant);
router.route("/:productid/variants/:skuid").get(_variant["default"].getAVariant).patch(_authorization["default"].protectAdmin, _variant["default"].updateAVariant)["delete"](_authorization["default"].protectAdmin, _variant["default"].deleteAVariant); //product options

router.route("/:productid/options").get(_options["default"].getOptions).post(_authorization["default"].protectAdmin, _options["default"].addAnOption);
router.route("/:productid/options/:optionid")["delete"](_authorization["default"].protectAdmin, _options["default"].deleteAnOption).put(_authorization["default"].protectAdmin, _options["default"].updateAnOption); //product values

router.route("/:productid/options/:optionid/values").get(_optionValues["default"].getValues).post(_authorization["default"].protectAdmin, _optionValues["default"].addAValue);
router.route("/:productid/options/:optionid/values/:valueid")["delete"](_authorization["default"].protectAdmin, _optionValues["default"].removeAValue); //Categories

router.route("/:productid/categories").get(_categories["default"].getCategoriesForProduct);
router.route("/:productid/categories/:categoryid").put(_authorization["default"].protectAdmin, _categories["default"].addCategoryToProduct)["delete"](_authorization["default"].protectAdmin, _categories["default"].removeCategoryFromProduct); //product/

router.route("/").get(_products["default"].getAllProducts).post(_authorization["default"].protectAdmin, _products["default"].addAProduct).patch(_authorization["default"].protectAdmin, _products["default"].updateAProduct);
router.route("/:id").get(_products["default"].getAProduct)["delete"](_authorization["default"].protectAdmin, _products["default"].deleteAProduct);
var productRouter = router;
exports.productRouter = productRouter;
//# sourceMappingURL=products.route.js.map