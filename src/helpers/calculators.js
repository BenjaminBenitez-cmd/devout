/**
 *
 * @param {array} cartitems accepts an array containing price and quantity values
 * @returns {float} the total cost of the items
 */
export const calculateSubTotal = (cartitems) => {
  return cartitems.reduce((sum, i) => sum + i.price * i.quantity).toFixed(2);
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
 * @param {float} subtotal
 * @param {float} tax
 * @returns
 */
export const total = (subtotal, tax) => {
  return subtotal + tax;
};
