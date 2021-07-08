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
    const product = await ProductService.getAProduct(id);

    response.status(SUCCESS).json({
      status: "Success",
      product,
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
    const product = await ProductService.updateAProduct(...request.body);

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
