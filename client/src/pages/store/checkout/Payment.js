import React, { useCallback, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Col, FormGroup, Row } from "reactstrap";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Button from "components/buttons/Button";
import CheckoutSummary from "components/blocks/CheckoutSummary";
import CheckoutSteps from "components/headers/CheckoutSteps";
import LayoutStoreHome from "layouts/StoreHome";

import useCart from "hooks/useCart";
import useAuth from "hooks/useAuth";
import { getUserFromLocalStorage } from "helpers/localstorage";
import PaymentRequests from "api/payment.requests";
import config from "config";

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

const promise = loadStripe(config.STRIPE_KEY);

const PaymentForm = () => {
  const user = getUserFromLocalStorage();
  const { items, address } = useCart();
  const { email } = useAuth();
  const userEmail = email || user.email;
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  //handle the submission logic
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!clientSecret) {
      return;
    }

    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            city: address.city,
            country: address.country,
            line1: address.address1,
            line2: address.address2,
            state: address.state,
          },
          phone: address.phone,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const fetchPaymentToken = useCallback(async () => {
    if (!items && !userEmail) {
      return;
    }

    const response = await PaymentRequests.getInitializationToken({
      items,
      email: userEmail,
    });
    setClientSecret(response.clientSecret);
  }, [items, userEmail]);

  //get the payment token
  useEffect(() => {
    fetchPaymentToken();
  }, [fetchPaymentToken]);

  return (
    <div>
      {succeeded && <Redirect to="/checkout/success" />}
      <form id="payment-form" onSubmit={onSubmit}>
        <Row>
          <Col sm={12}>
            <CheckoutSteps step2 />
          </Col>
          <Col sm={12} md={4}>
            <div style={{ maxWidth: "500px", marginBottom: "100px" }}>
              <FormGroup>
                <label className="text-extrasmall">Email</label>
                <p>{userEmail}</p>
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
          <Col md={{ offset: 5, size: 3 }}>
            <CheckoutSummary items={items} />
            {/**submit button */}
            <Button
              width="100%"
              type="submit"
              disabled={processing || disabled || succeeded}
              id="submit"
            >
              {processing ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Pay Now"
              )}
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

const StorePayment = ({ address }) => {
  return (
    <LayoutStoreHome>
      <Elements stripe={promise}>
        <PaymentForm address={address} />
      </Elements>
    </LayoutStoreHome>
  );
};

export default StorePayment;
