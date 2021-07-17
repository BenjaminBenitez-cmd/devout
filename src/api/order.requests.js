import instance from "./axios.custom";

//classes for our product requests
class OrderRequests {
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
