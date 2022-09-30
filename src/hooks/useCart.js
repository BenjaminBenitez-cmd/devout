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
      const localCart = getCartFromLocalStorage();
      if (!localCart) return;
      saveCartToLocalStorage(localCart.filter((item) => item.skuid !== skuid));
    } else {
      try {
        const cart = await CartRequests.getOne();
        await CartRequests.removeOneFromCart(cart.cart.id, skuid);
      } catch (err) {
        console.error(err);
      }
    }
    dispatch({ type: REMOVE_ITEM, payload: skuid });
  };

  const addItem = useCallback(
    async (product) => {
      if (!product) return;
      let newItem = {
        productid: product.id,
        skuid: product.skuid,
        images: product.images,
        name: product.name,
        price: product.price,
        quantity: 1,
      };

      if (!authenticated) {
        const localCart = getCartFromLocalStorage();
        if (!localCart) {
          saveCartToLocalStorage([newItem]);
        } else {
          saveCartToLocalStorage([...localCart, newItem]);
        }
        dispatch({ type: ADD_ITEM, payload: newItem });
      } else {
        try {
          const cartResponse = await CartRequests.getOne();
          await CartRequests.addOneToCart(cartResponse.cart.id, {
            skuid: product.skuid,
            productid: product.id,
            quantity: 1,
          });
          dispatch({ type: ADD_ITEM, payload: newItem });
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
    if (!authenticated) {
      const items = getCartFromLocalStorage();
      if (!items) return;
      dispatch({ type: FETCH_ITEMS, payload: items });
    } else {
      CartRequests.getOne().then((response) => {
        dispatch({ type: FETCH_ITEMS, payload: response.cart.items });
      });
    }
  }, [authenticated, dispatch]);

  return { ...state, removeItem, addItem, clearCartItems, addAddress };
};

export default useCart;
