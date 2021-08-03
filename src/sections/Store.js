import React from "react";
import { Switch, Route } from "react-router-dom";
import StoreMain from "../pages/StoreMain";
import StoreHome from "../pages/StoreHome";
import StoreProducts from "../pages/StoreProducts";
import StoreProductDetails from "../pages/StoreProductDetails";
import StoreCart from "../pages/StoreCart";
import StoreSignin from "../pages/StoreSignin";
import StoreSignup from "../pages/StoreSignup";
import StoreVerify from "../pages/StoreVerify";
import CartProvider from "../context/CartContext";
import StoreCheckout from "../pages/StoreCheckout";
import StoreNotFound from "../pages/StoreNotFound";
import StoreAccount from "../pages/StoreAccount";

const Store = () => {
  return (
    <CartProvider>
      <Switch>
        <Route exact path="/" component={StoreHome} />
        <Route path="/checkout/" component={StoreCheckout} />
        <Route path="/cart" component={StoreCart} />
        <Route path="/shop" component={StoreMain} />
        <Route path="/products/:collection" component={StoreProducts} />
        <Route path="/products/" component={StoreProducts} />
        <Route path="/product/:id" component={StoreProductDetails} />
        <Route path="/verification/:token" component={StoreVerify} />
        <Route path="/signin" component={StoreSignin} />
        <Route path="/signup" component={StoreSignup} />
        <Route path="/account" component={StoreAccount} />
        <Route path="*" component={StoreNotFound} />
      </Switch>
    </CartProvider>
  );
};

export default Store;
