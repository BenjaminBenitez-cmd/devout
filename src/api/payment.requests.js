import instance from "./axios.custom";

//classes for our product requests
class PaymentRequests {
  static getInitializationToken = async (values) => {
    try {
      const response = await instance.post(
        `/users/orders/create-payment-intent`,
        values
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };
}

export default PaymentRequests;
