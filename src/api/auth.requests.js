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

  static signinAdmin = async (values) => {
    try {
      const response = await instance.post(`/admin/signin`, values);
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

  static signupAdmin = async (values) => {
    try {
      const response = await instance.post(`/admin/signup`, values);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  static signupverify = async (values) => {
    try {
      const response = await instance.post(`/users/validate`, values);
      return response;
    } catch (err) {
      throw err;
    }
  };
}

export default AuthRequests;
