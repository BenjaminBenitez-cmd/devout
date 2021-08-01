import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const useCount = () => {
  const { addItem, removeItem, clearCart, cartItems, setCartItems } =
    useContext(CartContext);
  return { addItem, removeItem, clearCart, cartItems, setCartItems };
};

export default useCount;
