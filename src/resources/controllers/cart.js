import { CartCRUD } from "../../database/crud";
import { ErrorHandler } from "../../utils/errors";
import {
  SUCCESS,
  ERROR,
  SUCCESS_MODIFICATION,
} from "../../constants/statuscodes";

const addACart = async (request, response, next) => {
  const { id } = request.user;
  let { total } = request.body;

  if (total == null) {
    total = 0;
  }
  /**
   * check if a cart already exists
   * create a session cart for the user
   * insert the id and quantity if provided
   */

  try {
    const cartQuery = await CartCRUD.getOneByUserID(id);
    if (cartQuery.rows.length > 0) {
      throw new ErrorHandler(ERROR, "A cart for this user already exists");
    }

    await CartCRUD.createOne(id, total);
    response.status(SUCCESS).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getACart = async (request, response, next) => {
  const { id } = request.user;

  /**
   * use the user's id to get cart
   * if the user has a cart use it to fetch cart items
   */

  try {
    const cartQuery = await CartCRUD.getOneByUserID(id);
    //if cart is empty return empty
    let cart;
    if (cartQuery.rows.length === 0) {
      const cartQuery = await CartCRUD.createOne(id, 0);
      cart = cartQuery.rows[0];
    }

    let cartItems;

    if (cartQuery.rows.length > 0) {
      const cartItemsQuery = await CartItemCRUD.getManyBySessionID(
        cartQuery.rows[0].sessionid
      );
      cartItems =
        cartItemsQuery.rows.length > 0 &&
        cartItemsQuery.rows.map((item) => {
          return {
            id: item.cartid,
            productid: item.productid,
            skuid: item.skuid,
            quantity: item.quantity,
          };
        });
    }

    response.status(SUCCESS).json({
      message: "Success",
      cart: {
        id: cart.sessionid || cartQuery.rows[0].sessionid,
        items: cartItems,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteACart = async (request, response, next) => {
  const { id } = request.user;
  const { cartid } = request.params;

  try {
    await CartCRUD.removeOne(cartid, id);
    response.status(SUCCESS_MODIFICATION).end();
  } catch (err) {
    next(err);
  }
};

const CartControllers = {
  addACart,
  getACart,
  deleteACart,
};

export default CartControllers;
