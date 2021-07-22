import instance from "./axios.custom";

//classes for our product requests
class CartRequests {
  static getOne = async () => {
    try {
      const response = await instance.get(`/users/cart`);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  static addOne = async (values) => {
    try {
      const response = await instance.post(`/users/cart`, values);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  static removeOne = async (id) => {
    try {
      const response = await instance.delete(`/users/cart/${id}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  static addOneToCart = async (cartid, values) => {
    try {
      const response = await instance.post(
        `/users/cart/${cartid}/items`,
        values
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  static removeOneFromCart = async (cartid, itemid) => {
    try {
      await instance.delete(`/users/cart/${cartid}/items/${itemid}`);
    } catch (err) {
      throw err;
    }
  };
}

export default CartRequests;
