import React from "react";
import { Col, Form, FormGroup, Row } from "reactstrap";
import { CardElement, useElements } from "@stripe/react-stripe-js";
import PrimaryButton from "../components/buttons/PrimaryButton";
import useCart from "../hooks/useCart";
import CheckoutSteps from "../components/headers/CheckoutSteps";
import { MyTextField } from "../components/inputs/CustomInputs";
import { getUserFromLocalStorage } from "../helpers/localstorage";

const options = {
  style: {
    base: {
      color: "#000000",
      fontSize: "12px",
      fontFamily: "Open Sans",
      border: "1px solid #000000",
    },
  },
};

const StorePayment = ({
  handleChange,
  processing,
  disabled,
  succeeded,
  error,
  setPaymentMethod,
}) => {
  const { email } = getUserFromLocalStorage();
  const elements = useElements();
  return (
    <Row>
      <Col sm={12}>
        <CheckoutSteps step2 />
      </Col>
      <Col sm={12} md={4}>
        <div style={{ width: "500px", marginBottom: "100px" }}>
          <FormGroup>
            {email ? (
              <>
                <label className="text-extrasmall">Email</label>
                <p>{email}</p>
              </>
            ) : (
              <MyTextField name="email" label="Email" type="email" />
            )}
          </FormGroup>
          <div style={{ borderBottom: "2px solid black" }}></div>
          <div className="my-3">
            <label className="text-extrasmall">Credit Card Details</label>
            <CardElement
              id="card-element"
              options={options}
              onChange={handleChange}
            />
          </div>
          <FormGroup>
            {/*Show any error that happens when processing the payment */}
            {error && (
              <div className="card-error" role="alert">
                {error}
              </div>
            )}
            {/**Show a success message upon completition */}
            {succeeded && (
              <p
                className={
                  succeeded ? "result-message" : "result-message-hidden"
                }
              >
                Payment succeeded, thank you for your purchase!
              </p>
            )}
          </FormGroup>
        </div>
      </Col>
      <Col md={{ offset: 4, size: 4 }}>
        {/**submit button */}
        <PrimaryButton
          type="submit"
          onClick={() => setPaymentMethod(elements.getElement(CardElement))}
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
