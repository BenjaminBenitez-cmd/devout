import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import StoreShipping from "../../pages/StoreShipping";
import StorePayment from "../../pages/StorePayment";
import StoreCheckoutAuth from "../../pages/StoreCheckoutAuth";
import StoreProtected from "../other/StoreProtected";
import useCart from "../../hooks/useCart";

const CheckoutForm = () => {
  const [address, setAddress] = useState(null);
  console.log("a");
  debugger;
  const { cartItems } = useCart();
  return (
    <Switch>
      {/**If cart is empty redirect to the checkout page */}
      {/* {cartItems.length <= 0 && <Redirect to="/cart/" />} */}
      <Route path="/checkout/auth" render={() => <StoreCheckoutAuth />} />
      {/**If user does not provide email or authentication then redirect here */}
      {/**Route to shipping */}
      <StoreProtected
        path="/checkout/shipping"
        render={() => <StoreShipping setAddress={setAddress} />}
      />
      {/**Route to Payment */}
      <StoreProtected
        path="/checkout/payment"
        render={() => <StorePayment address={address} />}
      />
    </Switch>
  );
};

export default CheckoutForm;
