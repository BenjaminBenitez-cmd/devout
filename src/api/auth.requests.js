import instance from "./axios.custom";

//classes for our product requests
class AuthRequests {
  static signin = async (values) => {
    try {
      const response = await instance.post(`/users/signin`, values);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  static signup = async (values) => {
    try {
      const response = await instance.post(`/users/signup`, values);
      return response.data;
    } catch (err) {
      throw err;
    }
  };
}

export default AuthRequests;
