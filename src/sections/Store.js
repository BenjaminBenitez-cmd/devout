import React from "react";
import { Switch, Route } from "react-router-dom";
import StoreMain from "../pages/StoreMain";
import StoreHome from "../pages/StoreHome";
import StoreProducts from "../pages/StoreProducts";
import StoreProductDetails from "../pages/StoreProductDetails";
import StoreCart from "../pages/StoreCart";
import StoreCheckoutAuth from "../pages/StoreCheckoutAuth";

const Store = () => {
  return (
    <Switch>
      <Route path="/checkout/auth" component={StoreCheckoutAuth} />
      <Route path="/cart" component={StoreCart} />
      <Route path="/shop" component={StoreMain} />
      <Route path="/products" component={StoreProducts} />
      <Route path="/product/:id" component={StoreProductDetails} />
      <Route path="/" component={StoreHome} />
    </Switch>
  );
};

export default Store;
