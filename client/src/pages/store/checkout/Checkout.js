import React from "react";

import LayoutStoreHome from "layouts/StoreHome";
import CheckoutForm from "components/Forms/Checkout";

const StoreCheckout = () => {
  return (
    <LayoutStoreHome>
      <CheckoutForm />
    </LayoutStoreHome>
  );
};

export default StoreCheckout;
