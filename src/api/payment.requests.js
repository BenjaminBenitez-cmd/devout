import instance from "./axios.custom";

//classes for our product requests
class PaymentRequests {
  static getInitializationToken = async (values) => {
    try {
      const response = await instance.post(`/users/payments/intents`, values);
      return response.data;
    } catch (err) {
      throw err;
    }
  };
}

export default PaymentRequests;
