const { AdminCRUD } = require("./admin.crud");
const { UsersCRUD } = require("./user.crud");
const { ProductCRUD } = require("./product.crud");
const { CategoriesCRUD } = require("./categories.crud");
const { SKUCRUD } = require("./sku.crud");
const { OptionsCRUD } = require("./option.crud");
const { InventoryCRUD } = require("./inventory.crud");
const { DiscountCRUD } = require("./discounts.crud");
const { AddressCRUD } = require("./addresses.crud");
const { ImageCRUD } = require("./image.crud");
const { OrderCRUD } = require("./order.crud");
const { CartCRUD } = require("./cart.crud");
const { CartItemCRUD } = require("./cartitems.crud");
const { ProductCatCRUD } = require("./productcategories.crud");
const { PaymentCRUD } = require("./payment.crud");
const { ProductOptionsCRUD } = require("./option.crud");

module.exports = {
  ProductOptionsCRUD,
  PaymentCRUD,
  CartItemCRUD,
  CartCRUD,
  ProductCatCRUD,
  AdminCRUD,
  UsersCRUD,
  ProductCRUD,
  CategoriesCRUD,
  SKUCRUD,
  OptionsCRUD,
  InventoryCRUD,
  DiscountCRUD,
  AddressCRUD,
  ImageCRUD,
  OrderCRUD,
};
