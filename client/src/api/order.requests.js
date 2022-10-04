import instance from "./axios.custom";

//classes for our product requests
class OrderRequests {
  static getMany = async () => {
    try {
      const response = await instance.get(`/orders`);
      return response.data;
    } catch (err) {
      throw err.response.message;
    }
  };

  static getManyForUser = async () => {
    try {
      const response = await instance.get(`/users/orders`);
      return response.data;
    } catch (err) {
      throw err.response.message;
    }
  };

  static getOne = async (id) => {
    try {
      const response = await instance.get(`/orders/${id}`);
      return response.data;
    } catch (err) {
      throw err.response.message;
    }
  };

  static deleteOne = async (id) => {
    try {
      const response = await instance.delete(`/orders/${id}`);
      return response.data;
    } catch (err) {
      throw err.response.message;
    }
  };
}

export default OrderRequests;
