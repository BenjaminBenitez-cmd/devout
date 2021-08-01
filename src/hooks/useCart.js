import { useCallback, useContext, useEffect } from "react";
import CartRequests from "../api/cart.requests";
import ProductRequests from "../api/product.requests";
import { CartContext } from "../context/CartContext";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../helpers/localstorage";
import { mapProductsToCart } from "../helpers/mappers";
import useAuth from "./useAuth";

const useCart = () => {
  const { authenticated } = useAuth();
  const { cartItems, removeItem, addItem, setCartItems, clearCart } =
    useContext(CartContext);
  //get cart items either locally or from api

  const getCartItems = useCallback(async () => {
    const { products } = await ProductRequests.getMany();
    if (!authenticated) {
      const cart = getCartFromLocalStorage(); //get cart from localstorage
      if (!cart) {
        return;
      }
      return setCartItems(mapProductsToCart(cart.items, products));
    }

    try {
      const { cart } = await CartRequests.getOne();
      const productsAndCart = mapProductsToCart(cart.items, products);
      setCartItems(productsAndCart);
    } catch (err) {
      console.error(err);
    }
  }, []);

  /**
   *
   * @param {object} product receives a product object
   * @returns state altering function
   */
  const addAnItem = async (product) => {
    const item = {
      productid: product.id,
      skuid: product.skuid,
      quantity: 1,
    };
    if (!authenticated) {
      let cart = getCartFromLocalStorage();
      if (!cart) {
        //item that will be added
        const newCart = {
          items: [item],
        };
        addItem({ ...item, ...product });
        return saveCartToLocalStorage(newCart);
      }

      //if cart add it
      cart.items = [...cart.items, item];
      addItem({ ...item, ...product });
      return saveCartToLocalStorage(cart);
    }

    //if user is authenticated
    let { cart } = await CartRequests.getOne();
    await CartRequests.addOneToCart(cart.id, item);

    return addItem({ ...item, ...product });
  };

  /**
   *
   * @param {object} param0 receives object containing product and item id
   *
   */
  const removeAnItem = async ({ skuid, id }) => {
    if (!authenticated) {
      const cart = getCartFromLocalStorage();
      const newItems = cart.items.filter((item) => item.skuid !== skuid);
      saveCartToLocalStorage({ items: newItems });
      //remove from state
      return removeItem(skuid);
    }
    try {
      const { cart } = await CartRequests.getOne();
      await CartRequests.removeOneFromCart(cart.id, skuid);
      //remove from state
      removeItem(skuid);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // if (cartItems.length > 0) return;
    getCartItems();
  }, [getCartItems]);

  return { cartItems, addAnItem, removeAnItem, clearCart };
};

export default useCart;
