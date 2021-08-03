import {
  SKUCRUD,
  ProductCRUD,
  ImageCRUD,
  InventoryCRUD,
} from "../../database/crud";
import { ErrorHandler } from "../../utils/errors";
import { checkResults } from "../../utils/validate";
import {
  NOT_AUTHORIZED,
  NOT_FOUND,
  ERROR,
  SUCCESS,
  MISSING_PARAMS,
  SUCCESS_MODIFICATION,
} from "../../constants/statuscodes";

const createAVariant = async (request, response, next) => {
  const { productid } = request.params;
  const { skucode, price, amount, images, optionid, valueid } = request.body;
  //manually populate values for islive and unlimited amounts
  const islive = true;
  const unlimited = false;

  //Throw error if body is missing
  if (!request.body) {
    next(new ErrorHandler(NOT_AUTHORIZED, "Missing request body"));
  }

  try {
    //Validate productid
    const productQuery = await ProductCRUD.getOneByID(productid);
    checkResults(productQuery, NOT_FOUND, "Product not found");

    //Create inventory
    const inventoryQuery = await InventoryCRUD.createOne(
      amount,
      islive,
      unlimited
    );

    checkResults(inventoryQuery, ERROR, "Unable to add inventory");

    const { inventoryid } = inventoryQuery.rows[0];

    //Check Price
    const finalPrice = price ? price : productQuery.rows[0].productprice;

    //Create SKU
    const skuQuery = await SKUCRUD.createOne(
      skucode,
      finalPrice,
      inventoryid,
      productid
    );
    checkResults(skuQuery, ERROR, "Unable to add sku value");

    let { skuid } = skuQuery.rows[0];

    const skuVariantQuery = await SKUCRUD.values.createOne(
      productid,
      skuid,
      optionid,
      valueid
    );

    checkResults(skuVariantQuery, ERROR, "Unable to add variant");

    //insert array of images
    const imagesQuery = await Promise.all(
      //get the images
      images.map(async (image) => {
        const imageQuery = await ImageCRUD.createOne(image, productid, skuid);
        checkResults(imageQuery, ERROR, "Unable to add images");
        const { imageid, imageurl } = imageQuery.rows[0];
        return {
          id: imageid,
          url: imageurl,
        };
      })
    );

    response.status(SUCCESS).json({
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
        images: imagesQuery,
      },
    });

    //
  } catch (err) {
    next(err);
  }
};

const deleteAVariant = async (request, response, next) => {
  const { variantid } = request.params;

  try {
    await SKUCRUD.removeOne(variantid);
    response.status(SUCCESS_MODIFICATION).send("Successfully removed variant");
  } catch (err) {
    next(err);
  }
};

const updateAVariant = async (request, response, next) => {
  const { productid, skuid } = request.params;
  const { price, amount, skucode, images } = request.body;

  /** Need to update any inventory information, images, and values */
  try {
    //Check if Variant
    const isVariant = await SKUCRUD.values.getOneBySKUID(skuid);
    checkResults(isVariant, NOT_AUTHORIZED, "This is not a variant");

    //If variant proceed to update the sku
    const variantQuery = await SKUCRUD.updateOne(skuid, skucode, price);
    checkResults(variantQuery, ERROR, "Unable to update variant");
    const { productinventoryid } = variantQuery.rows[0];

    if (amount !== undefined && amount !== null) {
      await InventoryCRUD.updateOne(productinventoryid, amount);
    }

    let imagesUpdated;

    if (images !== undefined && images.length > 0) {
      imagesUpdated = await Promise.all(
        images.map(async (image) => {
          const imageQuery = await ImageCRUD.createOne(image, productid, skuid);
          checkResults(imageQuery, ERROR, "Unable to add image");
          const { imageurl, imageid } = imageQuery.rows[0];
          return {
            id: imageid,
            url: imageurl,
          };
        })
      );
    }
    response.status(SUCCESS_MODIFICATION).json({
      message: "Success",
      variant: {
        productid: productid,
        skuid: skuid,
        updatedimages: imagesUpdated,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getAVariant = async (request, response, next) => {
  const { productid, skuid } = request.params;
  const { optionid } = request.query;

  //Check Params
  if (skuid == undefined || optionid == undefined || productid == undefined) {
    return next(new ErrorHandler(MISSING_PARAMS, "Missing parameters"));
  }

  try {
    //get inventory ids, sku and options and value id
    const variantQuery = await SKUCRUD.values.getOneBySKUID(skuid);
    checkResults(variantQuery, NOT_FOUND, "Could not find variant");

    const { valueid } = variantQuery.rows[0];

    //get SKU
    const skuQuery = await SKUCRUD.getOneBySKUID(skuid);
    checkResults(skuQuery, NOT_FOUND, "Could not find SKU");

    const { productinventoryid, price, skuname } = skuQuery.rows[0];

    const inventoryQuery = await InventoryCRUD.getOne(productinventoryid);
    checkResults(inventoryQuery, NOT_FOUND, "Could not find inventory");

    const {
      inventoryquantity,
      inventorylive,
      inventoryunlimited,
      inventoryid,
    } = inventoryQuery.rows[0];

    const imagesQuery = await ImageCRUD.getManyByProductAndSKU(
      productid,
      skuid
    );
    // checkResults(imagesQuery, NOT_FOUND, "Unable to get images");

    response.status(SUCCESS).json({
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
        images: imagesQuery.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getAllVariants = async (request, response, next) => {
  const { productid } = request.params;

  try {
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

    response
      .status(SUCCESS)
      .json({ message: "Success", variants: mapvariants });
  } catch (err) {
    next(err);
  }
};

const VariantControllers = {
  createAVariant,
  getAVariant,
  updateAVariant,
  deleteAVariant,
  getAllVariants,
};

export default VariantControllers;
