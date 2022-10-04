import { useCallback, useContext, useEffect } from "react";
import CartRequests from "api/cart.requests";
import { CartContext } from "context/CartContext";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../helpers/localstorage";
import {
  ADD_ITEM,
  CLEAR_ITEMS,
  FETCH_ITEMS,
  REMOVE_ITEM,
  ADD_ADDRESS,
} from "./cart.constants";
import useAuth from "./useAuth";

const useCart = () => {
  const { authenticated } = useAuth();
  const { state, dispatch } = useContext(CartContext);

  const removeItem = async (skuid) => {
    if (!authenticated) {
      const savedCart = getCartFromLocalStorage();
      saveCartToLocalStorage(savedCart.filter((item) => item.skuid !== skuid));
      dispatch({ type: REMOVE_ITEM, payload: skuid });
    } else {
      try {
        const response = await CartRequests.getOne();
        await CartRequests.removeOneFromCart(response.cart.id, skuid);
        dispatch({ type: REMOVE_ITEM, payload: skuid });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const addItem = useCallback(
    async (product) => {
      if (!product || !product.live) {
        return;
      }

      const payload = {
        productid: product.id,
        skuid: product.skuid,
        images: product.images,
        name: product.name,
        price: product.price,
        quantity: 1,
      };

      if (!authenticated) {
        const savedCart = getCartFromLocalStorage() || [];
        saveCartToLocalStorage([...savedCart, payload]);
        dispatch({ type: ADD_ITEM, payload });
      } else {
        try {
          // fetch existing cart
          const response = await CartRequests.getOne();
          await CartRequests.addOneToCart(response.cart.id, {
            skuid: product.skuid,
            productid: product.id,
            quantity: 1,
          });
          dispatch({ type: ADD_ITEM, payload });
        } catch (err) {
          console.error(err);
        }
      }
    },
    [authenticated, dispatch]
  );

  const clearCartItems = useCallback(() => {
    localStorage.removeItem("cart");
    dispatch({ type: CLEAR_ITEMS });
  }, [dispatch]);

  const addAddress = useCallback(
    (address) => {
      dispatch({ type: ADD_ADDRESS, payload: address });
    },
    [dispatch]
  );

  useEffect(() => {
    let items = [];

    if (!authenticated) {
      items = getCartFromLocalStorage() || [];
    } else {
      CartRequests.getOne().then((response) => {
        items = response.cart.items;
      });
    }

    dispatch({ type: FETCH_ITEMS, payload: items });
  }, [authenticated, dispatch]);

  return { ...state, removeItem, addItem, clearCartItems, addAddress };
};

export default useCart;
