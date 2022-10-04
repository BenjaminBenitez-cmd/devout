import { createContext, useReducer } from "react";
import {
  ADD_ITEM,
  CLEAR_ITEMS,
  FETCH_ITEMS,
  REMOVE_ITEM,
  ADD_ADDRESS,
} from "hooks/cart.constants";

export const CartContext = createContext();

const initialState = {
  items: [],
  address: {},
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ADD_ITEM:
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      case REMOVE_ITEM:
        return {
          ...state,
          items: state.items.filter((item) => item.skuid !== action.payload),
        };
      case FETCH_ITEMS:
        return {
          ...state,
          items: [...action.payload],
        };
      case CLEAR_ITEMS:
        return {
          ...state,
          items: [],
        };
      case ADD_ADDRESS:
        return {
          ...state,
          address: {
            ...action.payload,
          },
        };
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
