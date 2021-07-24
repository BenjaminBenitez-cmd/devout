import axios from "axios";
import React, { useEffect } from "react";
import { Col, FormGroup, Row } from "reactstrap";
import { CardElement } from "@stripe/react-stripe-js";
import PrimaryButton from "../components/buttons/PrimaryButton";
import useCart from "../hooks/useCart";
import checkoutHeader from "../components/headers/CheckoutSteps";
import CheckoutSteps from "../components/headers/CheckoutSteps";

const options = {
  style: {
    color: "red",
    fontSize: "12px",
    fontFamily: "Open Sans",
    border: "1px solid black",
  },
};
const StorePayment = ({
  setClientSecret,
  handleChange,
  processing,
  disabled,
  succeeded,
  error,
}) => {
  const { cartItems } = useCart();
  console.log(cartItems);
  return (
    <Row>
      <Col sm={12}>
        <CheckoutSteps step1 />
      </Col>
      <Col sm={12} md={4}>
        <FormGroup>
          <CardElement
            id="card-element"
            options={options}
            onChange={handleChange}
          />
        </FormGroup>
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
      </Col>
      <Col md={{ offset: 4, size: 4 }}>
        {/**submit button */}
        {/* <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button> */}
        <PrimaryButton
          type="submit"
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </PrimaryButton>
      </Col>
    </Row>
  );
};

export default StorePayment;
