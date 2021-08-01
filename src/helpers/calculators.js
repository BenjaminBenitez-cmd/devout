/**
 *
 * @param {array} cartitems accepts an array containing price and quantity values
 * @returns {float} the total cost of the items
 */
export const calculateSubTotal = (cartitems) => {
  //check for single value
  if (cartitems.length === 1) return cartitems[0].price * cartitems[0].quantity;
  return cartitems.reduce((sum, i) => sum + i.price * i.quantity, 0);
};

/**
 *
 * @param {float} total
 * @param {float} tax amount to be deducted
 * @returns
 */

export const calculateTax = (total, tax) => {
  return (total * tax) / 100;
};

/**
 *
 * @param {array} cartItems an array of cart items
 * @param {float} tax tax percentage
 * @returns {float} total
 */
export const calculateTotal = (cartItems, tax) => {
  const total = calculateSubTotal(cartItems);
  return Math.round(total + calculateTax(total, tax)); //round to nearest integer
};

/**
 *
 * @param {array} cartItems
 * @param {float} taxpercentage
 * @returns {object} with subtotal, tax and total
 */
export const calculateAll = (cartItems, taxpercentage) => {
  const subtotal = calculateSubTotal(cartItems);
  const tax = calculateTax(subtotal, taxpercentage);
  const total = calculateTotal(cartItems, taxpercentage);
  return {
    subtotal,
    tax,
    total,
  };
};
