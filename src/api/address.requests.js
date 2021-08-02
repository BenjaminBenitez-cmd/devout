import instance from "./axios.custom";

//classes for our product requests
class AddressRequests {
  static getOne = async () => {
    try {
      const response = await instance.get(`/users/address`);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  static addOne = async (values) => {
    try {
      const response = await instance.post("/users/address", values);
      return response.data;
    } catch (err) {
      throw err;
    }
  };
}

export default AddressRequests;
