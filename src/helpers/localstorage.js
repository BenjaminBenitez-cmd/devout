/**
 *
 * @param {object} values accepts user item
 */

export const saveUserToLocalStorage = (values) =>
  localStorage.setItem("user", JSON.stringify(values));

/**
 *
 * @returns {object} user saved to local storage
 */
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return JSON.parse(user);
};

export const clearLocalStorage = () => localStorage.clear();

export const saveCartToLocalStorage = (values) =>
  localStorage.setItem("cart", JSON.stringify(values));

export const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return JSON.parse(cart);
};
