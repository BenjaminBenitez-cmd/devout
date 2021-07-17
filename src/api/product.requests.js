import instance from "./axios.custom";

//classes for our product requests
class ProductRequests {
  static getOne = async (id) => {
    try {
      const response = await instance.get(`/products/${id}`);
      return response.data;
    } catch (err) {
      throw err.response.message;
    }
  };

  static getMany = async () => {
    try {
      const response = await instance.get("/products");
      return response.data;
    } catch (err) {
      throw err.response.message;
    }
  };

  static updateOne = async (values) => {
    try {
      await instance.patch("/products", values);
    } catch (err) {
      throw err;
    }
  };
}

export default ProductRequests;
