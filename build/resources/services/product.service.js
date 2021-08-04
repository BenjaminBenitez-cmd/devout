"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _statuscodes = require("../../constants/statuscodes");

var _crud = require("../../database/crud");

var _errors = require("../../utils/errors");

var _validate = require("../../utils/validate");

var addAProduct = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(skucode, name, price, cartdesc, shortdesc, longdesc, discountid, images, amount) {
    var isLive, unlimited;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isLive = true;
            unlimited = false;
            return _context3.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resolve, reject) {
                var inventoryInsert, productInsert, skuInsert, imageQuery;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _crud.InventoryCRUD.createOne(amount, isLive, unlimited);

                      case 3:
                        inventoryInsert = _context2.sent;
                        _context2.next = 6;
                        return _crud.ProductCRUD.createOne(name, price, cartdesc, shortdesc, longdesc);

                      case 6:
                        productInsert = _context2.sent;
                        _context2.next = 9;
                        return _crud.SKUCRUD.createOne(skucode, price, inventoryInsert.rows[0].inventoryid, productInsert.rows[0].productid);

                      case 9:
                        skuInsert = _context2.sent;
                        _context2.next = 12;
                        return Promise.all( //insert all image urls to db
                        images.map( /*#__PURE__*/function () {
                          var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(image) {
                            var imageResult, _imageResult$rows$, imageid, imageurl;

                            return _regenerator["default"].wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return _crud.ImageCRUD.createOne(image, productInsert.rows[0].productid, skuInsert.rows[0].skuid);

                                  case 2:
                                    imageResult = _context.sent;
                                    _imageResult$rows$ = imageResult.rows[0], imageid = _imageResult$rows$.imageid, imageurl = _imageResult$rows$.imageurl;
                                    return _context.abrupt("return", {
                                      id: imageid,
                                      url: imageurl
                                    });

                                  case 5:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x12) {
                            return _ref3.apply(this, arguments);
                          };
                        }()));

                      case 12:
                        imageQuery = _context2.sent;
                        //insert categories
                        // if (categories !== null || categories.length > 0) {
                        //   categories.forEach(async (category) => {
                        //     await ProductCatCRUD.createOne(id, category.id);
                        //   });
                        // }
                        resolve({
                          id: productInsert.rows[0].productid,
                          skuid: skuInsert.rows[0].skuid,
                          name: name,
                          cartdescription: cartdesc,
                          longdescription: longdesc,
                          shortdescription: shortdesc,
                          price: price,
                          amount: amount,
                          islive: isLive,
                          images: imageQuery
                        });
                        _context2.next = 19;
                        break;

                      case 16:
                        _context2.prev = 16;
                        _context2.t0 = _context2["catch"](0);
                        reject(_context2.t0);

                      case 19:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[0, 16]]);
              }));

              return function (_x10, _x11) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function addAProduct(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
    return _ref.apply(this, arguments);
  };
}();

var getAllProducts = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve, reject) {
                var productQuery, rows, productsOrdersAndSales;
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return _crud.ProductCRUD.getMany();

                      case 3:
                        productQuery = _context5.sent;

                        if (productQuery.rows.length <= 0) {
                          resolve([]);
                        }

                        rows = productQuery.rows;
                        _context5.next = 8;
                        return Promise.all(rows.map( /*#__PURE__*/function () {
                          var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(product) {
                            var productid, productname, productprice, productcartdesc, productshortdesc, productlongdesc, productdiscountid, saleQuery, orderQuery, skuQuery, skuid, imageQuery, categoriesQuery, mappedCategories;
                            return _regenerator["default"].wrap(function _callee4$(_context4) {
                              while (1) {
                                switch (_context4.prev = _context4.next) {
                                  case 0:
                                    productid = product.productid, productname = product.productname, productprice = product.productprice, productcartdesc = product.productcartdesc, productshortdesc = product.productshortdesc, productlongdesc = product.productlongdesc, productdiscountid = product.productdiscountid;
                                    _context4.next = 3;
                                    return _crud.OrderCRUD.items.getSalesByProductID(productid);

                                  case 3:
                                    saleQuery = _context4.sent;
                                    _context4.next = 6;
                                    return _crud.OrderCRUD.items.getManyByProductID(productid);

                                  case 6:
                                    orderQuery = _context4.sent;
                                    _context4.next = 9;
                                    return _crud.SKUCRUD.getManyByProductID(productid);

                                  case 9:
                                    skuQuery = _context4.sent;
                                    skuid = skuQuery.rows[0].skuid;
                                    _context4.next = 13;
                                    return _crud.ImageCRUD.getManyByProductAndSKU(productid, skuid);

                                  case 13:
                                    imageQuery = _context4.sent;
                                    _context4.next = 16;
                                    return _crud.CategoriesCRUD.getManyForProduct(productid);

                                  case 16:
                                    categoriesQuery = _context4.sent;
                                    mappedCategories = categoriesQuery.rows.map(function (cat) {
                                      return {
                                        id: cat.categoryid,
                                        name: cat.categoryname
                                      };
                                    });
                                    return _context4.abrupt("return", {
                                      id: productid,
                                      name: productname,
                                      price: productprice,
                                      cartdescription: productcartdesc,
                                      shortdescription: productshortdesc,
                                      longdescription: productlongdesc,
                                      categories: mappedCategories,
                                      discountid: productdiscountid,
                                      sales: saleQuery.rows.length,
                                      orders: orderQuery.rows.length,
                                      images: imageQuery.rows
                                    });

                                  case 19:
                                  case "end":
                                    return _context4.stop();
                                }
                              }
                            }, _callee4);
                          }));

                          return function (_x15) {
                            return _ref6.apply(this, arguments);
                          };
                        }()));

                      case 8:
                        productsOrdersAndSales = _context5.sent;
                        resolve(productsOrdersAndSales);
                        _context5.next = 15;
                        break;

                      case 12:
                        _context5.prev = 12;
                        _context5.t0 = _context5["catch"](0);
                        reject(_context5.t0);

                      case 15:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, null, [[0, 12]]);
              }));

              return function (_x13, _x14) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getAllProducts() {
    return _ref4.apply(this, arguments);
  };
}();
/**
 *
 * @param { integer } id will be used to filter for the products
 * @returns { object } with a product and it's variants
 */


var getAProduct = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(id) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (!id) new _errors.ErrorHandler(_statuscodes.NOT_AUTHORIZED, "Missing id");
            return _context9.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(resolve, reject) {
                var productQuery, _productQuery$rows$, productid, productname, productprice, productcartdesc, productshortdesc, productlongdesc, productdiscountid, skuvariantsQuery, rows, allVariants, mapvariants, nonVariant, categoriesQuery, categories;

                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.prev = 0;
                        _context8.next = 3;
                        return _crud.ProductCRUD.getOneByID(id);

                      case 3:
                        productQuery = _context8.sent;

                        if (productQuery.rows.length <= 0) {
                          reject(new _errors.ErrorHandler(_statuscodes.NOT_FOUND, "Unable to find product"));
                        }

                        _productQuery$rows$ = productQuery.rows[0], productid = _productQuery$rows$.productid, productname = _productQuery$rows$.productname, productprice = _productQuery$rows$.productprice, productcartdesc = _productQuery$rows$.productcartdesc, productshortdesc = _productQuery$rows$.productshortdesc, productlongdesc = _productQuery$rows$.productlongdesc, productdiscountid = _productQuery$rows$.productdiscountid; //GET SKUS with productid

                        _context8.next = 8;
                        return _crud.SKUCRUD.getManyByProductID(productid);

                      case 8:
                        skuvariantsQuery = _context8.sent;
                        (0, _validate.checkResults)(skuvariantsQuery, _statuscodes.NOT_FOUND, "Product could not be located"); //This is the result from fetching variants

                        //This is the result from fetching variants
                        rows = skuvariantsQuery.rows;
                        _context8.next = 13;
                        return _crud.SKUCRUD.values.getManyByProductID(id);

                      case 13:
                        allVariants = _context8.sent;
                        _context8.next = 16;
                        return Promise.all(rows.map( /*#__PURE__*/function () {
                          var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(variant) {
                            var skuid, skuname, price, productinventoryid, inventoryQuery, _inventoryQuery$rows$, inventoryquantity, inventorylive, inventoryunlimited, imageQuery;

                            return _regenerator["default"].wrap(function _callee7$(_context7) {
                              while (1) {
                                switch (_context7.prev = _context7.next) {
                                  case 0:
                                    skuid = variant.skuid, skuname = variant.skuname, price = variant.price, productinventoryid = variant.productinventoryid;
                                    _context7.next = 3;
                                    return _crud.InventoryCRUD.getOne(productinventoryid);

                                  case 3:
                                    inventoryQuery = _context7.sent;
                                    (0, _validate.checkResults)(inventoryQuery, _statuscodes.NOT_FOUND, "Could not find matching inventory");
                                    _inventoryQuery$rows$ = inventoryQuery.rows[0], inventoryquantity = _inventoryQuery$rows$.inventoryquantity, inventorylive = _inventoryQuery$rows$.inventorylive, inventoryunlimited = _inventoryQuery$rows$.inventoryunlimited;
                                    _context7.next = 8;
                                    return _crud.ImageCRUD.getManyByProductAndSKU(productid, skuid);

                                  case 8:
                                    imageQuery = _context7.sent;
                                    return _context7.abrupt("return", {
                                      skuid: skuid,
                                      skuname: skuname,
                                      price: price,
                                      quantity: inventoryunlimited ? "unlimited" : inventoryquantity,
                                      live: inventorylive,
                                      images: imageQuery.rows
                                    });

                                  case 10:
                                  case "end":
                                    return _context7.stop();
                                }
                              }
                            }, _callee7);
                          }));

                          return function (_x19) {
                            return _ref9.apply(this, arguments);
                          };
                        }()));

                      case 16:
                        mapvariants = _context8.sent;
                        //find our non variant
                        nonVariant = mapvariants.find(function (sku) {
                          return !allVariants.rows.some(function (vari) {
                            return vari.skuid.toString() === sku.skuid.toString();
                          });
                        });
                        _context8.next = 20;
                        return _crud.ProductCatCRUD.getMany(id);

                      case 20:
                        categoriesQuery = _context8.sent;

                        if (categoriesQuery.rows.length > 0) {
                          categories = categoriesQuery.rows.map(function (categories) {
                            return {
                              categoryid: categories.categoryid,
                              productid: id,
                              name: categories.categoryname
                            };
                          });
                        }

                        resolve({
                          id: productid,
                          name: productname,
                          price: productprice,
                          skuid: nonVariant.skuid,
                          skucode: nonVariant.skuname,
                          images: nonVariant.images,
                          live: nonVariant.live,
                          quantity: nonVariant.quantity,
                          cartdescription: productcartdesc,
                          shortdescription: productshortdesc,
                          longdescription: productlongdesc,
                          discountid: productdiscountid,
                          categories: categories,
                          variants: mapvariants.filter(function (variant) {
                            return variant.skuid.toString() !== nonVariant.skuid;
                          })
                        });
                        _context8.next = 28;
                        break;

                      case 25:
                        _context8.prev = 25;
                        _context8.t0 = _context8["catch"](0);
                        reject(_context8.t0);

                      case 28:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8, null, [[0, 25]]);
              }));

              return function (_x17, _x18) {
                return _ref8.apply(this, arguments);
              };
            }()));

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function getAProduct(_x16) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 *
 * @param {integer} id
 * @param {integer} skuid
 * @param {string} name
 * @param {float} price
 * @param {string} shortdescription
 * @param {string} longdescription
 * @param {array} images
 * @param {integer} amount
 * @returns {object} this object contains the id and sku id of recently updated product
 */


var updateAProduct = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(id, skuid, name, price, shortdescription, longdescription, images, amount) {
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            return _context12.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(resolve, reject) {
                var isItAVariant, imagesQuery, islive, unlimited, skuQuery, productinventoryid;
                return _regenerator["default"].wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        _context11.prev = 0;
                        _context11.next = 3;
                        return _crud.SKUCRUD.values.getOneBySKUID(skuid);

                      case 3:
                        isItAVariant = _context11.sent;

                        //Check if product is variant
                        if (isItAVariant.rows[0] !== undefined) {
                          reject(new _errors.ErrorHandler(_statuscodes.ERROR, "This is a variant update it with using variants"));
                        }

                        _context11.next = 7;
                        return _crud.ProductCRUD.updateOne(id, name, price, shortdescription, longdescription);

                      case 7:
                        if (!(images !== null && images.length > 0)) {
                          _context11.next = 11;
                          break;
                        }

                        _context11.next = 10;
                        return Promise.all(images.map( /*#__PURE__*/function () {
                          var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(image) {
                            var imageQuery, imageid;
                            return _regenerator["default"].wrap(function _callee10$(_context10) {
                              while (1) {
                                switch (_context10.prev = _context10.next) {
                                  case 0:
                                    _context10.next = 2;
                                    return _crud.ImageCRUD.createOne(image, id, skuid);

                                  case 2:
                                    imageQuery = _context10.sent;
                                    (0, _validate.checkResults)(imageQuery, _statuscodes.ERROR, "Unable to add message");
                                    imageid = imageQuery.rows[0].imageid;
                                    return _context10.abrupt("return", {
                                      id: imageid,
                                      url: image
                                    });

                                  case 6:
                                  case "end":
                                    return _context10.stop();
                                }
                              }
                            }, _callee10);
                          }));

                          return function (_x30) {
                            return _ref12.apply(this, arguments);
                          };
                        }()));

                      case 10:
                        imagesQuery = _context11.sent;

                      case 11:
                        if (!(amount !== undefined && amount !== null)) {
                          _context11.next = 21;
                          break;
                        }

                        islive = true;
                        unlimited = false; //Get the inventory id

                        _context11.next = 16;
                        return _crud.SKUCRUD.getOneBySKUID(skuid);

                      case 16:
                        skuQuery = _context11.sent;

                        if (skuQuery.rows.lenght <= 0) {
                          reject(new _errors.ErrorHandler(_statuscodes.NOT_FOUND, "Unable to find values"));
                        }

                        productinventoryid = skuQuery.rows[0].productinventoryid;
                        _context11.next = 21;
                        return _crud.InventoryCRUD.updateOne(productinventoryid, amount, islive, unlimited);

                      case 21:
                        // if (categories !== null || categories.length > 0) {
                        //   categories.forEach(async (category) => {
                        //     //if it is already it means we have to delete it
                        //     const checkQuery = await ProductCRUD.getOneByID(category.id);
                        //     if (checkQuery.rows.length > 0) {
                        //       await ProductCRUD.deleteAProduct(category.id);
                        //       return;
                        //     }
                        //     await ProductCatCRUD.createOne(id, category.id);
                        //   });
                        // }
                        resolve({
                          id: id,
                          skuid: skuid,
                          updatedimages: imagesQuery
                        });
                        _context11.next = 27;
                        break;

                      case 24:
                        _context11.prev = 24;
                        _context11.t0 = _context11["catch"](0);
                        reject(_context11.t0);

                      case 27:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11, null, [[0, 24]]);
              }));

              return function (_x28, _x29) {
                return _ref11.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function updateAProduct(_x20, _x21, _x22, _x23, _x24, _x25, _x26, _x27) {
    return _ref10.apply(this, arguments);
  };
}();

var deleteAProduct = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(id) {
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            return _context14.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(resolve, reject) {
                return _regenerator["default"].wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        _context13.prev = 0;
                        _context13.next = 3;
                        return _crud.ProductCRUD.removeOne(id);

                      case 3:
                        resolve(true);
                        _context13.next = 9;
                        break;

                      case 6:
                        _context13.prev = 6;
                        _context13.t0 = _context13["catch"](0);
                        reject(_context13.t0);

                      case 9:
                      case "end":
                        return _context13.stop();
                    }
                  }
                }, _callee13, null, [[0, 6]]);
              }));

              return function (_x32, _x33) {
                return _ref14.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function deleteAProduct(_x31) {
    return _ref13.apply(this, arguments);
  };
}();

var ProductService = {
  addAProduct: addAProduct,
  getAllProducts: getAllProducts,
  getAProduct: getAProduct,
  updateAProduct: updateAProduct,
  deleteAProduct: deleteAProduct
};
var _default = ProductService;
exports["default"] = _default;
//# sourceMappingURL=product.service.js.map