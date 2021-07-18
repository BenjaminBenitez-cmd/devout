import instance from "./axios.custom";

//classes for our product requests
class CategoryRequests {
  static getMany = async () => {
    try {
      const response = await instance.get(`/categories`);
      return response.data;
    } catch (err) {
      throw err.response.message;
    }
  };

  static addOne = async (values) => {
    try {
      const response = await instance.post(`/categories`, values);
      return response.data;
    } catch (err) {
      throw err.response.message;
    }
  };

  static removeOne = async (id) => {
    try {
      const response = await instance.delete(`/categories/${id}`);
      return response.data;
    } catch (err) {
      throw err.response.message;
    }
  };
}

export default CategoryRequests;
