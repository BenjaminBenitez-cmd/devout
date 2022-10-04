import { checkResults } from "../../utils/validate";
import { ErrorHandler } from "../../utils/errors";
import { CartItemCRUD, ImageCRUD, InventoryCRUD } from "../../database/crud";
import {
  SUCCESS_MODIFICATION,
  ERROR,
  NOT_FOUND,
  SUCCESS,
} from "../../constants/statuscodes";
import db from "../../database/connection";

const getAllItems = async (request, response, next) => {
  const { cartid } = request.params;
  /**
   * get items in cart
   */
  try {
    const cartItemsQuery = await CartItemCRUD.getManyBySessionID(cartid);

    let cartItems;
    cartItems = await Promise.all(
      cartItemsQuery.rows.length > 0 &&
        cartItemsQuery.rows.map(async (item) => {
          const products = await ProductCRUD.getOneByID(item.productid);
          const images = await ImageCRUD.getManyByProductAndSKU(
            item.productid,
            item.skuid
          );
          return {
            id: item.cartid,
            productid: item.productid,
            skuid: item.skuid,
            quantity: item.quantity,
            name: products.rows[0].productname,
            images: images.rows,
            price: products.rows[0].productprice,
          };
        })
    );

    response.status(SUCCESS).json({
      message: "Success",
      items: cartItems,
    });
  } catch (err) {
    next(err);
  }
};

const updateCartItem = async (request, response, next) => {
  const { cartid, itemid } = request.params;
  const { quantity } = request.body;
  /**
   * get items in cart
   * use the item id to fetch the cart item
   * check if it is available
   * update the item
   */
  try {
    const itemQuery = await CartItemCRUD.getOneByID(itemid);
    checkResults(itemQuery, NOT_FOUND, "Could not find item");

    const { skuid } = itemQuery.rows[0];

    const inventoryQuery = await InventoryCRUD.getAmount(skuid);

    const { inventoryquantity, inventorylive } = inventoryQuery.rows[0];

    //Check for inventory amounts
    if (inventoryquantity === 0) {
      throw new ErrorHandler(NOT_FOUND, "Product is out of stock");
    } else if (!inventorylive) {
      throw new ErrorHandler(NOT_FOUND, "Product is not live");
    } else if (quantity > inventoryquantity) {
      throw new (NOT_FOUND, "Product is out of stock")();
    }

    await CartItemCRUD.updateQuantity(cartid, itemid, quantity);
    response.status(SUCCESS_MODIFICATION).end();
  } catch (err) {
    next(err);
  }
};

const addACartItem = async (request, response, next) => {
  const { cartid } = request.params;
  const { productid, skuid, quantity } = request.body;
  /**
   * check if the product has enough quantity left
   */
  try {
    const inventoryQuery = await InventoryCRUD.getAmount(skuid);
    checkResults(inventoryQuery, NOT_FOUND, "Not found");

    const { inventoryquantity, inventorylive } = inventoryQuery.rows[0];

    //Check for inventory amounts
    if (inventoryquantity === 0) {
      throw new ErrorHandler(ERROR, "Product is out of stock");
    } else if (!inventorylive) {
      throw new ErrorHandler(ERROR, "Product is not live");
    }

    const cartItemQuery = await CartItemCRUD.createOne(
      cartid,
      productid,
      skuid,
      quantity
    );

    response
      .status(SUCCESS)
      .json({ message: "Success", item: { id: cartItemQuery.rows[0].cartid } });
  } catch (err) {
    next(err);
  }
};

const deleteCartItem = async (request, response, next) => {
  const { cartid, skuid } = request.params;
  /**
   * get items in cart
   */
  try {
    /** remove one from cart */
    const removeQuery = await CartItemCRUD.removeOne(cartid, skuid);
    checkResults(removeQuery, NOT_FOUND, "Could not find cart item");
    response.status(SUCCESS_MODIFICATION).end();
  } catch (err) {
    next(err);
  }
};

const CartItemController = {
  addACartItem,
  getAllItems,
  updateCartItem,
  deleteCartItem,
};

export default CartItemController;
