"use strict";

var _require = require("./admin.crud"),
    AdminCRUD = _require.AdminCRUD;

var _require2 = require("./user.crud"),
    UsersCRUD = _require2.UsersCRUD;

var _require3 = require("./product.crud"),
    ProductCRUD = _require3.ProductCRUD;

var _require4 = require("./categories.crud"),
    CategoriesCRUD = _require4.CategoriesCRUD;

var _require5 = require("./sku.crud"),
    SKUCRUD = _require5.SKUCRUD;

var _require6 = require("./option.crud"),
    OptionsCRUD = _require6.OptionsCRUD;

var _require7 = require("./inventory.crud"),
    InventoryCRUD = _require7.InventoryCRUD;

var _require8 = require("./discounts.crud"),
    DiscountCRUD = _require8.DiscountCRUD;

var _require9 = require("./addresses.crud"),
    AddressCRUD = _require9.AddressCRUD;

var _require10 = require("./image.crud"),
    ImageCRUD = _require10.ImageCRUD;

var _require11 = require("./order.crud"),
    OrderCRUD = _require11.OrderCRUD;

var _require12 = require("./cart.crud"),
    CartCRUD = _require12.CartCRUD;

var _require13 = require("./cartitems.crud"),
    CartItemCRUD = _require13.CartItemCRUD;

var _require14 = require("./productcategories.crud"),
    ProductCatCRUD = _require14.ProductCatCRUD;

var _require15 = require("./payment.crud"),
    PaymentCRUD = _require15.PaymentCRUD;

var _require16 = require("./option.crud"),
    ProductOptionsCRUD = _require16.ProductOptionsCRUD;

module.exports = {
  ProductOptionsCRUD: ProductOptionsCRUD,
  PaymentCRUD: PaymentCRUD,
  CartItemCRUD: CartItemCRUD,
  CartCRUD: CartCRUD,
  ProductCatCRUD: ProductCatCRUD,
  AdminCRUD: AdminCRUD,
  UsersCRUD: UsersCRUD,
  ProductCRUD: ProductCRUD,
  CategoriesCRUD: CategoriesCRUD,
  SKUCRUD: SKUCRUD,
  OptionsCRUD: OptionsCRUD,
  InventoryCRUD: InventoryCRUD,
  DiscountCRUD: DiscountCRUD,
  AddressCRUD: AddressCRUD,
  ImageCRUD: ImageCRUD,
  OrderCRUD: OrderCRUD
};
//# sourceMappingURL=index.js.map