/**
 *
 * @param {Array} cartitems cartitem ids along with their products
 */
const calculateOrder = (cartitems) => {
  let total = 0;

  //check if stock is available
  if (cartitems.length === 0) {
    cartitems[0].quantity * cartitems[0].price;
  } else {
    total = cartitems.reduce((a, i) => a + i.price * i.quantity, 0);
  }

  const tax = total * (13.5 / 100);
  total = Math.round(total + tax);
  return total;
};

const OrderService = {
  calculateOrder,
};

export default OrderService;
