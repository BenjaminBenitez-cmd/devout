const {
  SUCCESS,
  ERROR,
  NOT_FOUND,
  NOT_AUTHORIZED,
  SUCCESS_MODIFICATION,
} = require("../../constants/statuscodes");
const {
  InventoryCRUD,
  ProductCRUD,
  SKUCRUD,
  ImageCRUD,
  OrderCRUD,
} = require("../../database/crud");
const { ErrorHandler } = require("../../utils/errors");
const { checkResults } = require("../../utils/validate");

const addAProduct = async (request, response, next) => {
  // if (!request.body) next(new ErrorHandler(400, "Request Body Missing"));
  const {
    skucode,
    name,
    price,
    cartdesc,
    shortdesc,
    longdesc,
    discountid,
    images,
    amount,
  } = request.body;

  let isLive = true;
  let unlimited = false;

  try {
    //insert the amount to the inventory first
    const inventoryInsert = await InventoryCRUD.createOne(
      amount,
      isLive,
      unlimited
    );
    checkResults(inventoryInsert, ERROR, "Something went wrong");

    //Insert the product
    const productInsert = await ProductCRUD.createOne(
      name,
      price,
      cartdesc,
      shortdesc,
      longdesc
    );
    checkResults(productInsert, ERROR, "Something went wrong");

    const { inventoryid } = inventoryInsert.rows[0];
    const { productid } = productInsert.rows[0];

    //We will now create our new SKU for our product
    const skuInsert = await SKUCRUD.createOne(
      skucode,
      price,
      inventoryid,
      productid
    );
    checkResults(skuInsert, ERROR, "Something went wrong");

    const { skuid } = skuInsert.rows[0];

    //Insert all images
    const imageQuery = await Promise.all(
      //insert all image urls to db
      images.map(async (image) => {
        let imageResult = await ImageCRUD.createOne(image, productid, skuid);
        checkResults(imageResult, ERROR, "Something went wrong");
        let { imageid, imageurl } = imageResult.rows[0];
        return {
          id: imageid,
          url: imageurl,
        };
      })
    );

    response.status(SUCCESS).json({
      status: "Success",
      product: {
        id: productid,
        skuid: skuid,
        name: name,
        cartdescription: cartdesc,
        longdescription: longdesc,
        shortdescription: shortdesc,
        price: price,
        amount: amount,
        islive: isLive,
        images: imageQuery,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAllProducts = async (request, response, next) => {
  try {
    const productQuery = await ProductCRUD.getMany();
    checkResults(productQuery);

    const { rows } = productQuery;

    const productsOrdersAndSales = await Promise.all(
      rows.map(async (product) => {
        const {
          productid,
          productname,
          productprice,
          productcartdesc,
          productshortdesc,
          productlongdesc,
          productdiscountid,
        } = product;

        const saleQuery = await OrderCRUD.items.getSalesByProductID(productid);

        const orderQuery = await OrderCRUD.items.getManyByProductID(productid);
        const skuQuery = await SKUCRUD.getManyByProductID(productid);
        checkResults(skuQuery, NOT_FOUND, "Unable to fetch SKU");

        const { skuid } = skuQuery.rows[0];

        const imageQuery = await ImageCRUD.getManyByProductAndSKU(
          productid,
          skuid
        );

        checkResults(imageQuery, NOT_FOUND, "Unable to fetch images");

        return {
          id: productid,
          name: productname,
          price: productprice,
          cartdescription: productcartdesc,
          shortdescription: productshortdesc,
          longdescription: productlongdesc,
          discountid: productdiscountid,
          sales: saleQuery.rows.length,
          orders: orderQuery.rows.length,
          images: imageQuery.rows,
        };
      })
    );

    response.status(SUCCESS).json({
      status: "success",
      results: productsOrdersAndSales.length,
      products: productsOrdersAndSales,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAProduct = async (request, response, next) => {
  const { id } = request.params;
  if (!id) new ErrorHandler(NOT_AUTHORIZED, "Missing id");

  try {
    const productQuery = await ProductCRUD.getOneByID(id);
    checkResults(productQuery, NOT_FOUND, "Product could not be located");

    const {
      productid,
      productname,
      productprice,
      productcartdesc,
      productshortdesc,
      productlongdesc,
      productdiscountid,
    } = productQuery.rows[0];

    //GET SKUS with productid
    const skuvariantsQuery = await SKUCRUD.getManyByProductID(productid);
    checkResults(skuvariantsQuery, NOT_FOUND, "Product could not be located");

    //This is the result from fetching variants
    const { rows } = skuvariantsQuery;

    /**if there is only one variant it means we dont have to
     * map the inventory to each row  */

    const mapvariants = await Promise.all(
      rows.map(async (variant) => {
        const { skuid, skuname, price, productinventoryid } = variant;

        const inventoryQuery = await InventoryCRUD.getOne(productinventoryid);
        checkResults(
          inventoryQuery,
          NOT_FOUND,
          "Could not find matching inventory"
        );

        const { inventoryquantity, inventorylive, inventoryunlimited } =
          inventoryQuery.rows[0];

        const imageQuery = await ImageCRUD.getManyByProductAndSKU(
          productid,
          skuid
        );

        return {
          skuid,
          skuname,
          price,
          quantity: inventoryunlimited ? "unlimited" : inventoryquantity,
          live: inventorylive,
          images: imageQuery.rows,
        };
      })
    );

    response.status(SUCCESS).json({
      status: "Success",
      product: {
        id: productid,
        name: productname,
        price: productprice,
        cartdescription: productcartdesc,
        shortdescription: productshortdesc,
        longdescription: productlongdesc,
        discountid: productdiscountid,
        variants: mapvariants,
      },
    });
  } catch (err) {
    console.log();
    next(err);
  }
};

const updateAProduct = async (request, response, next) => {
  const {
    id,
    skuid,
    name,
    price,
    shortdescription,
    longdescription,
    images,
    amount,
  } = request.body;

  try {
    //GET SKUs
    const isItAVariant = await SKUCRUD.values.getOneBySKUID(skuid);
    //Check if product is variant
    if (isItAVariant.rows[0] !== undefined) {
      throw new ErrorHandler(
        ERROR,
        "This is a variant update it with using variants"
      );
    }

    const updateQuery = await ProductCRUD.updateOne(
      id,
      name,
      price,
      shortdescription,
      longdescription
    );

    checkResults(updateQuery, ERROR, "Unable to update product");

    let imagesQuery;

    //Insert every image if urls were sent
    if (images !== undefined && images.length > 0) {
      imagesQuery = await Promise.all(
        images.map(async (image) => {
          const imageQuery = await ImageCRUD.createOne(image, id, skuid);
          checkResults(imageQuery, ERROR, "Unable to add message");
          let { imageid } = imageQuery.rows[0];
          return {
            id: imageid,
            url: image,
          };
        })
      );
    }

    //update the inventory if urls were sent
    if (amount !== undefined && amount !== null) {
      let islive = true;
      let unlimited = false;

      //Get the inventory id
      const skuQuery = await SKUCRUD.getOneBySKUID(skuid);
      checkResults(skuQuery, NOT_FOUND, "Unable to find sku");

      const { productinventoryid } = skuQuery.rows[0];

      await InventoryCRUD.updateOne(
        productinventoryid,
        amount,
        islive,
        unlimited
      );
      checkResults(InventoryCRUD, ERROR, "Unable to update Inventory");
    }

    response.status(SUCCESS_MODIFICATION).json({
      status: "Success",
      product: {
        id: id,
        skuid: skuid,
        updatedimages: imagesQuery,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteAProduct = async (request, response, next) => {
  const { id } = request.params;

  try {
    const deleteQuery = await ProductCRUD.removeOne(id);
    checkResults(deleteQuery, ERROR, "Unable to delete product");

    response.status(SUCCESS_MODIFICATION).send("Success");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addAProduct,
  getAllProducts,
  getAProduct,
  updateAProduct,
  deleteAProduct,
};
