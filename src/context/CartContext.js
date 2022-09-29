import { createContext, useReducer } from "react";
import {
  ADD_ITEM,
  CLEAR_ITEMS,
  FETCH_ITEMS,
  REMOVE_ITEM,
} from "hooks/cart.constants";

export const CartContext = createContext();

const initialState = [];

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ADD_ITEM:
        if (state.length <= 0) {
          return [...state, action.payload];
        }
        return [...state, action.payload];
      case REMOVE_ITEM:
        return state.filter((item) => item.skuid !== action.payload);
      case FETCH_ITEMS:
        return [...action.payload];
      case CLEAR_ITEMS:
        return [];
      default:
        return state;
    }
  }, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
