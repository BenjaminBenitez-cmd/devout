import axios from "axios";
import React, { useEffect } from "react";
import { Row } from "reactstrap";
import { CardElement } from "@stripe/react-stripe-js";

const StorePayment = ({
  setClientSecret,
  handleChange,
  processing,
  disabled,
  succeeded,
  error,
}) => {
  //get
  useEffect(() => {
    const fetchPaymentToken = async () => {
      const response = await axios.post(
        "http://localhost:3005/api/v1/users/orders/create-payment-intent",
        {
          items: [{ id: "xl-tshirt" }],
        }
      );
      setClientSecret(response.data.clientSecret);
    };
    fetchPaymentToken();
  }, []);

  return (
    <Row>
      <CardElement id="card-element" onChange={handleChange} />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/*Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/**Show a success message upon completition */}
      {succeeded && (
        <p className={succeeded ? "result-message" : "result-message-hidden"}>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            {" "}
            Stripe dashboard.
          </a>{" "}
          Refresh the page to pay again
        </p>
      )}
    </Row>
  );
};

export default StorePayment;
