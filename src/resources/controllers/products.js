import {
  SUCCESS,
  ERROR,
  NOT_FOUND,
  NOT_AUTHORIZED,
  SUCCESS_MODIFICATION,
} from "../../constants/statuscodes";
import {
  InventoryCRUD,
  ProductCRUD,
  SKUCRUD,
  ImageCRUD,
  OrderCRUD,
} from "../../database/crud";
import { ErrorHandler } from "../../utils/errors";
import { checkResults } from "../../utils/validate";
import ProductService from "../services/product.service";

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

  try {
    //add a product
    const newProduct = await ProductService.addAProduct(...request.body);

    response.status(SUCCESS).json({
      status: "Success",
      product: newProduct,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAllProducts = async (request, response, next) => {
  try {
    const productsAndSales = await ProductService.getAllProducts();

    response.status(SUCCESS).json({
      status: "success",
      results: productsAndSales.length,
      products: productsAndSales,
    });
  } catch (err) {
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

const ProductControllers = {
  addAProduct,
  getAllProducts,
  getAProduct,
  updateAProduct,
  deleteAProduct,
};

export default ProductControllers;
