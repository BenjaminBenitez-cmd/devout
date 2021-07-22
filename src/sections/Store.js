import React from "react";
import { Switch, Route } from "react-router-dom";
import StoreMain from "../pages/StoreMain";
import StoreHome from "../pages/StoreHome";
import StoreProducts from "../pages/StoreProducts";
import StoreProductDetails from "../pages/StoreProductDetails";
import StoreCart from "../pages/StoreCart";
import StoreCheckoutAuth from "../pages/StoreCheckoutAuth";
import StoreSignin from "../pages/StoreSignin";
import StoreSignup from "../pages/StoreSignup";
import StoreVerify from "../pages/StoreVerify";
import CartProvider from "../context/CartContext";
import StoreCheckout from "../pages/StoreCheckout";

const Store = () => {
  return (
    <CartProvider>
      <Switch>
        <Route path="/checkout/" component={StoreCheckout} />
        <Route path="/checkout/auth" component={StoreCheckoutAuth} />
        <Route path="/cart" component={StoreCart} />
        <Route path="/shop" component={StoreMain} />
        <Route path="/products" component={StoreProducts} />
        <Route path="/product/:id" component={StoreProductDetails} />
        <Route path="/verification/:token" component={StoreVerify} />
        <Route path="/signin" component={StoreSignin} />
        <Route path="/signup" component={StoreSignup} />
        <Route path="/" component={StoreHome} />
      </Switch>
    </CartProvider>
  );
};

export default Store;
