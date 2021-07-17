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

  static removeOne = async (id) => {
    try {
      const response = await instance.delete(`/products/${id}`);
      return response.data;
    } catch (err) {
      throw err.response.message;
    }
  };

  static addOne = async (values) => {
    try {
      const response = await instance.post("/products", values);
      return response.data;
    } catch (err) {
      throw err;
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

  static addCategoryToProduct = async (productid, categoryid) => {
    try {
      const response = await instance.put(
        `/products/${productid}/categories/${categoryid}`
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };
  static removeCategoryFromProduct = async (productid, categoryid) => {
    try {
      const response = await instance.delete(
        `/products/${productid}/categories/${categoryid}`
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };
}

export default ProductRequests;
