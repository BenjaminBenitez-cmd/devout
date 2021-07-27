import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import StoreShipping from "../../pages/StoreShipping";
import StorePayment from "../../pages/StorePayment";
import { Formik, Form } from "formik";
import { useStripe } from "@stripe/react-stripe-js";
import * as Yup from "yup";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import AddressRequests from "../../api/address.requests";
import PaymentRequests from "../../api/payment.requests";
import StoreCheckoutAuth from "../../pages/StoreCheckoutAuth";

const CheckoutForm = () => {
  const { cartItems } = useCart();
  const { authenticated } = useAuth();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const stripe = useStripe();
  //our form validation
  const validationSchema = Yup.object().shape({
    city: Yup.string().required("Required field"),
    state: Yup.string().required("Requied field"),
    phone: Yup.string().required("Required field"),
    country: Yup.string().required("Required field"),
    address1: Yup.string().required("Required field"),
  });
  const [initialValues, setInitialValues] = useState({
    city: "",
    state: "",
    phone: "",
    country: "",
    address1: "",
    address2: "",
  });

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  //handle the submission logic
  const onSubmit = async (values) => {
    if (!paymentMethod) return;
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: paymentMethod, //set with callback function
        billing_details: {
          address: {
            city: values.city,
            country: values.country,
            line1: values.address1,
            line2: values.address2,
            state: values.state,
          },
          phone: values.phone,
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
    alert(JSON.stringify(values));
  };

  //get the payment token
  useEffect(() => {
    const fetchPaymentToken = async () => {
      const response = await PaymentRequests.getInitializationToken({
        items: cartItems,
      });
      setClientSecret(response.clientSecret);
    };
    fetchPaymentToken();
  }, []);

  //fetch our address
  useEffect(() => {
    if (!authenticated) return;
    //get address if authenticated
    const fetchAddress = async () => {
      try {
        const response = await AddressRequests.getOne();
        if (!response.address) {
          return;
        } else {
          setInitialValues(response.address);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAddress();
  }, [authenticated]);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form id="payment-form">
        <Switch>
          {/**If cart is empty redirect to the checkout page */}
          {cartItems.length <= 0 && <Redirect to="/cart" />}
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
                setPaymentMethod={setPaymentMethod}
              />
            )}
          />
          <Redirect exact from="/checkout" to="/checkout/shipping" />
        </Switch>
      </Form>
    </Formik>
  );
};

export default CheckoutForm;
