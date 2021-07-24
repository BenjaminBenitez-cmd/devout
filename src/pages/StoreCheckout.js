import React from "react";
import LayoutStoreHome from "../layouts/LayoutStoreHome";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import config from "../config";
import CheckoutForm from "../components/Forms/CheckoutForm";

const promise = loadStripe(config.STRIPE_KEY);

const StoreCheckout = () => {
  return (
    <LayoutStoreHome>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </LayoutStoreHome>
  );
};

export default StoreCheckout;
