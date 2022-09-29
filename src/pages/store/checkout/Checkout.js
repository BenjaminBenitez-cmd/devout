import React from "react";

import LayoutStoreHome from "layouts/LayoutStoreHome";
import CheckoutForm from "components/Forms/Checkout";

const StoreCheckout = () => {
  return (
    <LayoutStoreHome>
      <CheckoutForm />
    </LayoutStoreHome>
  );
};

export default StoreCheckout;
