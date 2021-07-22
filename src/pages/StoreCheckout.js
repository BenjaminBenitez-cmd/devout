import React, { useState } from "react";
import LayoutStoreHome from "../layouts/LayoutStoreHome";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import config from "../config";
import CheckoutForm from "../components/Forms/CheckoutForm";
import { Redirect, Route, Switch } from "react-router-dom";
import StoreShipping from "./StoreShipping";
import StorePayment from "./StorePayment";
import { Formik } from "formik";
import { Form } from "reactstrap";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const promise = loadStripe(config.STRIPE_KEY);

const StoreCheckout = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const initialValues = {
    city: "",
    state: "",
    phone: "",
    country: "",
    address1: "",
    address2: "",
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const onSubmit = async () => {
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
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

  return (
    <Formik initialValues={initialValues}>
      <LayoutStoreHome>
        <Elements stripe={promise}>
          <Form id="payment-form" onSubmit={onSubmit}>
            <Switch>
              <Redirect from="/checkout" exact to="/checkout/shipping" />
              <Route to="/checkout/shipping" component={StoreShipping} />
              <Route
                to="/checkout/payment"
                render={() => (
                  <StorePayment
                    succeeded={succeeded}
                    error={error}
                    processing={processing}
                    handleChange={handleChange}
                    disabled={disabled}
                    setClientSecret={setClientSecret}
                  />
                )}
              />
            </Switch>
          </Form>
        </Elements>
      </LayoutStoreHome>
    </Formik>
  );
};

export default StoreCheckout;
