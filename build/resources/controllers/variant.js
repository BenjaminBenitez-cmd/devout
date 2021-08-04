"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _crud = require("../../database/crud");

var _errors = require("../../utils/errors");

var _validate = require("../../utils/validate");

var _statuscodes = require("../../constants/statuscodes");

var createAVariant = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response, next) {
    var productid, _request$body, skucode, price, amount, images, optionid, valueid, islive, unlimited, productQuery, inventoryQuery, inventoryid, finalPrice, skuQuery, skuid, skuVariantQuery, imagesQuery;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            productid = request.params.productid;
            _request$body = request.body, skucode = _request$body.skucode, price = _request$body.price, amount = _request$body.amount, images = _request$body.images, optionid = _request$body.optionid, valueid = _request$body.valueid; //manually populate values for islive and unlimited amounts

            islive = true;
            unlimited = false; //Throw error if body is missing

            if (!request.body) {
              next(new _errors.ErrorHandler(_statuscodes.NOT_AUTHORIZED, "Missing request body"));
            }

            _context2.prev = 5;
            _context2.next = 8;
            return _crud.ProductCRUD.getOneByID(productid);

          case 8:
            productQuery = _context2.sent;
            (0, _validate.checkResults)(productQuery, _statuscodes.NOT_FOUND, "Product not found"); //Create inventory

            _context2.next = 12;
            return _crud.InventoryCRUD.createOne(amount, islive, unlimited);

          case 12:
            inventoryQuery = _context2.sent;
            (0, _validate.checkResults)(inventoryQuery, _statuscodes.ERROR, "Unable to add inventory");
            inventoryid = inventoryQuery.rows[0].inventoryid; //Check Price

            finalPrice = price ? price : productQuery.rows[0].productprice; //Create SKU

            _context2.next = 18;
            return _crud.SKUCRUD.createOne(skucode, finalPrice, inventoryid, productid);

          case 18:
            skuQuery = _context2.sent;
            (0, _validate.checkResults)(skuQuery, _statuscodes.ERROR, "Unable to add sku value");
            skuid = skuQuery.rows[0].skuid;
            _context2.next = 23;
            return _crud.SKUCRUD.values.createOne(productid, skuid, optionid, valueid);

          case 23:
            skuVariantQuery = _context2.sent;
            (0, _validate.checkResults)(skuVariantQuery, _statuscodes.ERROR, "Unable to add variant"); //insert array of images

            _context2.next = 27;
            return Promise.all( //get the images
            images.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(image) {
                var imageQuery, _imageQuery$rows$, imageid, imageurl;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _crud.ImageCRUD.createOne(image, productid, skuid);

                      case 2:
                        imageQuery = _context.sent;
                        (0, _validate.checkResults)(imageQuery, _statuscodes.ERROR, "Unable to add images");
                        _imageQuery$rows$ = imageQuery.rows[0], imageid = _imageQuery$rows$.imageid, imageurl = _imageQuery$rows$.imageurl;
                        return _context.abrupt("return", {
                          id: imageid,
                          url: imageurl
                        });

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 27:
            imagesQuery = _context2.sent;
            response.status(_statuscodes.SUCCESS).json({
              status: "Success",
              variant: {
                productid: productid,
                skuid: skuid,
                skucode: skucode,
                price: finalPrice,
                inventoryid: inventoryid,
                amount: amount,
                optionid: optionid,
                valueid: valueid,
                images: imagesQuery
              }
            }); //

            _context2.next = 34;
            break;

          case 31:
            _context2.prev = 31;
            _context2.t0 = _context2["catch"](5);
            next(_context2.t0);

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 31]]);
  }));

  return function createAVariant(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var deleteAVariant = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request, response, next) {
    var variantid;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            variantid = request.params.variantid;
            _context3.prev = 1;
            _context3.next = 4;
            return _crud.SKUCRUD.removeOne(variantid);

          case 4:
            response.status(_statuscodes.SUCCESS_MODIFICATION).send("Successfully removed variant");
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](1);
            next(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 7]]);
  }));

  return function deleteAVariant(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var updateAVariant = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(request, response, next) {
    var _request$params, productid, skuid, _request$body2, price, amount, skucode, images, isVariant, variantQuery, productinventoryid, imagesUpdated;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _request$params = request.params, productid = _request$params.productid, skuid = _request$params.skuid;
            _request$body2 = request.body, price = _request$body2.price, amount = _request$body2.amount, skucode = _request$body2.skucode, images = _request$body2.images;
            /** Need to update any inventory information, images, and values */

            _context5.prev = 2;
            _context5.next = 5;
            return _crud.SKUCRUD.values.getOneBySKUID(skuid);

          case 5:
            isVariant = _context5.sent;
            (0, _validate.checkResults)(isVariant, _statuscodes.NOT_AUTHORIZED, "This is not a variant"); //If variant proceed to update the sku

            _context5.next = 9;
            return _crud.SKUCRUD.updateOne(skuid, skucode, price);

          case 9:
            variantQuery = _context5.sent;
            (0, _validate.checkResults)(variantQuery, _statuscodes.ERROR, "Unable to update variant");
            productinventoryid = variantQuery.rows[0].productinventoryid;

            if (!(amount !== undefined && amount !== null)) {
              _context5.next = 15;
              break;
            }

            _context5.next = 15;
            return _crud.InventoryCRUD.updateOne(productinventoryid, amount);

          case 15:
            if (!(images !== undefined && images.length > 0)) {
              _context5.next = 19;
              break;
            }

            _context5.next = 18;
            return Promise.all(images.map( /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(image) {
                var imageQuery, _imageQuery$rows$2, imageurl, imageid;

                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return _crud.ImageCRUD.createOne(image, productid, skuid);

                      case 2:
                        imageQuery = _context4.sent;
                        (0, _validate.checkResults)(imageQuery, _statuscodes.ERROR, "Unable to add image");
                        _imageQuery$rows$2 = imageQuery.rows[0], imageurl = _imageQuery$rows$2.imageurl, imageid = _imageQuery$rows$2.imageid;
                        return _context4.abrupt("return", {
                          id: imageid,
                          url: imageurl
                        });

                      case 6:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x11) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 18:
            imagesUpdated = _context5.sent;

          case 19:
            response.status(_statuscodes.SUCCESS_MODIFICATION).json({
              message: "Success",
              variant: {
                productid: productid,
                skuid: skuid,
                updatedimages: imagesUpdated
              }
            });
            _context5.next = 25;
            break;

          case 22:
            _context5.prev = 22;
            _context5.t0 = _context5["catch"](2);
            next(_context5.t0);

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 22]]);
  }));

  return function updateAVariant(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var getAVariant = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(request, response, next) {
    var _request$params2, productid, skuid, optionid, variantQuery, valueid, skuQuery, _skuQuery$rows$, productinventoryid, price, skuname, inventoryQuery, _inventoryQuery$rows$, inventoryquantity, inventorylive, inventoryunlimited, inventoryid, imagesQuery;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _request$params2 = request.params, productid = _request$params2.productid, skuid = _request$params2.skuid;
            optionid = request.query.optionid; //Check Params

            if (!(skuid == undefined || optionid == undefined || productid == undefined)) {
              _context6.next = 4;
              break;
            }

            return _context6.abrupt("return", next(new _errors.ErrorHandler(_statuscodes.MISSING_PARAMS, "Missing parameters")));

          case 4:
            _context6.prev = 4;
            _context6.next = 7;
            return _crud.SKUCRUD.values.getOneBySKUID(skuid);

          case 7:
            variantQuery = _context6.sent;
            (0, _validate.checkResults)(variantQuery, _statuscodes.NOT_FOUND, "Could not find variant");
            valueid = variantQuery.rows[0].valueid; //get SKU

            _context6.next = 12;
            return _crud.SKUCRUD.getOneBySKUID(skuid);

          case 12:
            skuQuery = _context6.sent;
            (0, _validate.checkResults)(skuQuery, _statuscodes.NOT_FOUND, "Could not find SKU");
            _skuQuery$rows$ = skuQuery.rows[0], productinventoryid = _skuQuery$rows$.productinventoryid, price = _skuQuery$rows$.price, skuname = _skuQuery$rows$.skuname;
            _context6.next = 17;
            return _crud.InventoryCRUD.getOne(productinventoryid);

          case 17:
            inventoryQuery = _context6.sent;
            (0, _validate.checkResults)(inventoryQuery, _statuscodes.NOT_FOUND, "Could not find inventory");
            _inventoryQuery$rows$ = inventoryQuery.rows[0], inventoryquantity = _inventoryQuery$rows$.inventoryquantity, inventorylive = _inventoryQuery$rows$.inventorylive, inventoryunlimited = _inventoryQuery$rows$.inventoryunlimited, inventoryid = _inventoryQuery$rows$.inventoryid;
            _context6.next = 22;
            return _crud.ImageCRUD.getManyByProductAndSKU(productid, skuid);

          case 22:
            imagesQuery = _context6.sent;
            // checkResults(imagesQuery, NOT_FOUND, "Unable to get images");
            response.status(_statuscodes.SUCCESS).json({
              status: "Success",
              variant: {
                skuid: skuid,
                skucode: skuname,
                productid: productid,
                inventoryid: inventoryid,
                optionid: optionid,
                valueid: valueid,
                price: price,
                amount: inventoryunlimited ? "Unlimited" : inventoryquantity,
                islive: inventorylive,
                images: imagesQuery.rows
              }
            });
            _context6.next = 29;
            break;

          case 26:
            _context6.prev = 26;
            _context6.t0 = _context6["catch"](4);
            next(_context6.t0);

          case 29:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[4, 26]]);
  }));

  return function getAVariant(_x12, _x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}();

var getAllVariants = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(request, response, next) {
    var productid, skuvariantsQuery, rows, mapvariants;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            productid = request.params.productid;
            _context8.prev = 1;
            _context8.next = 4;
            return _crud.SKUCRUD.getManyByProductID(productid);

          case 4:
            skuvariantsQuery = _context8.sent;
            (0, _validate.checkResults)(skuvariantsQuery, _statuscodes.NOT_FOUND, "Product could not be located"); //This is the result from fetching variants

            rows = skuvariantsQuery.rows;
            /**if there is only one variant it means we dont have to
             * map the inventory to each row  */

            _context8.next = 9;
            return Promise.all(rows.map( /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(variant) {
                var skuid, skuname, price, productinventoryid, inventoryQuery, _inventoryQuery$rows$2, inventoryquantity, inventorylive, inventoryunlimited, imageQuery;

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
                        _inventoryQuery$rows$2 = inventoryQuery.rows[0], inventoryquantity = _inventoryQuery$rows$2.inventoryquantity, inventorylive = _inventoryQuery$rows$2.inventorylive, inventoryunlimited = _inventoryQuery$rows$2.inventoryunlimited;
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

              return function (_x18) {
                return _ref8.apply(this, arguments);
              };
            }()));

          case 9:
            mapvariants = _context8.sent;
            response.status(_statuscodes.SUCCESS).json({
              message: "Success",
              variants: mapvariants
            });
            _context8.next = 16;
            break;

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](1);
            next(_context8.t0);

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 13]]);
  }));

  return function getAllVariants(_x15, _x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}();

var VariantControllers = {
  createAVariant: createAVariant,
  getAVariant: getAVariant,
  updateAVariant: updateAVariant,
  deleteAVariant: deleteAVariant,
  getAllVariants: getAllVariants
};
var _default = VariantControllers;
exports["default"] = _default;
//# sourceMappingURL=variant.js.map