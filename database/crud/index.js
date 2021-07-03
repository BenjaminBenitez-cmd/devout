const { AdminCRUD } = require("./admin.crud");
const { UsersCRUD } = require("./user.crud");
const { ProductCRUD } = require("./product.crud");
const { CategoriesCRUD } = require("./categories.crud");
const { SKUCRUD } = require("./sku.crud");
const { OptionsCRUD } = require("./option.crud");
const { InventoryCRUD } = require("./inventory.crud");
const { DiscountCRUD } = require("./discounts.crud");
const { AddressCRUD } = require("./Addresses.crud");
const { ImageCRUD } = require("./image.crud");
const { OrderCRUD } = require("./order.crud");
const { ProductCatCRUD } = require("./productcategories.crud");

module.exports = {
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
