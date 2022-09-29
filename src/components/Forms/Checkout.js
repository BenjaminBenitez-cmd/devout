import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import StoreShipping from "pages/store/checkout/Shipping";
import StorePayment from "pages/store/checkout/Payment";
import StoreCheckoutAuth from "pages/store/checkout/AuthWall";
import StoreSuccess from "pages/store/checkout/Success";
import StoreProtected from "components/other/StoreProtected";

const CheckoutForm = () => {
  const [address, setAddress] = useState(null);
  return (
    <Switch>
      {/**If cart is empty redirect to the checkout page */}
      {/* {state.length < 1 && <Redirect to="/cart" />} */}
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
      <Route path="/checkout/success" component={StoreSuccess} />
      <Redirect exact from="/checkout" to="/checkout/auth" />
    </Switch>
  );
};

export default CheckoutForm;
