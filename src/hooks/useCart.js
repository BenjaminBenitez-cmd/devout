const useCart = () => {
  const { addItem, clearCart, cartItems, removeItem } = useCart();

  return { cartItems, addItem, removeItem, clearCart };
};

export default useCart;
