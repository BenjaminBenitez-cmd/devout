import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  return { state, dispatch };
};

export default useCart;
