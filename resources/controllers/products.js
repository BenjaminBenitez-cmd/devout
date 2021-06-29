const { SUCCESS, ERROR } = require("../../constants/statuscodes");
const {
  InventoryCRUD,
  ProductCRUD,
  SKUCRUD,
  ImageCRUD,
} = require("../../database/crud");
const { ErrorHandler } = require("../../utils/errors");
const checkResults = require("../../utils/validate");

const addAProduct = async (request, response, next) => {
  if (!request.body) next(ErrorHandler(400, "Request Body Missing"));

  const {
    skucode,
    name,
    price,
    cartdesc,
    shortdesc,
    longdesc,
    categoryid,
    discountid,
    images,
    amount,
  } = req.body;

  let isLive = true;
  let unlimited = false;

  //insert the amount to the inventory first
  const inventoryInsert = await InventoryCRUD.createOne(
    amount,
    isLive,
    unlimited
  );
  checkResults(inventoryInsert, ERROR, "Something went wrong");

  //proceed to insert the product
  const productInsert = await ProductCRUD.createOne(
    name,
    price,
    cartdesc,
    shortdesc,
    longdesc,
    categoryid,
    discountid
  );
  checkResults(productInsert, ERROR, "Something went wrong");

  const { inventoryID } = inventoryInsert.rows[0];
  const { productID } = productInsert.rows[0];

  //We will now create our new SKU for our product
  const skuInsert = await SKUCRUD.createOne(
    skucode,
    price,
    inventoryID,
    productID
  );
  checkResults(skuInsert, ERROR, "Something went wrong");

  const { SKUID } = skuInsert.rows[0];

  //insert all image urls to db
  images.forEach((image) => {
    let imageResult = await ImageCRUD.createOne(image.url, productID, SKUID);
    checkResults(imageResult, ERROR, "Something went wrong");
  });

  response.status(SUCCESS).json({
    status: "Success",
    product: {
      id: productID,
      SKUID: SKUID,
      inventoryID: inventoryID,
    },
  });
};

module.exports.productController = {
  addAProduct,
};
