import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (item) => setCartItems((prev) => [...prev, item]);

  const removeItem = (id) =>
    setCartItems((prev) => prev.filter((item) => item.skuid !== id));

  const defaultContext = {
    addItem,
    removeItem,
    cartItems,
    setCartItems,
  };

  return (
    <CartContext.Provider value={defaultContext}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
