import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import StoreShipping from "../../pages/StoreShipping";
import StorePayment from "../../pages/StorePayment";
import { Formik, Form } from "formik";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import * as Yup from "yup";
import useCart from "../../hooks/useCart";

const CheckoutForm = () => {
  const { cartItems } = useCart();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const validationSchema = Yup.object().shape({
    city: Yup.string().required("Required field"),
    state: Yup.string().required("Requied field"),
    phone: Yup.string().required("Required field"),
    country: Yup.string().required("Required field"),
    address1: Yup.string().required("Required field"),
  });
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

  //handle the submission logic
  const onSubmit = async (values) => {
    // setProcessing(true);
    // const payload = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //   },
    // });
    // if (payload.error) {
    //   setError(`Payment failed ${payload.error.message}`);
    //   setProcessing(false);
    // } else {
    //   setError(null);
    //   setProcessing(false);
    //   setSucceeded(true);
    // }
    alert(JSON.stringify(values));
  };
  console.log(initialValues);
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form id="payment-form">
        <Switch>
          {/**If cart is empty redirect to the checkout page */}
          {/* {cartItems.length <= 0 && <Redirect to="/cart" />} */}
          <Redirect from="/checkout" exact to="/checkout/shipping" />
          <Route path="/checkout/shipping" component={StoreShipping} />
          <Route
            path="/checkout/payment"
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
    </Formik>
  );
};

export default CheckoutForm;
