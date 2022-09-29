import React from "react";
import { Switch, Route } from "react-router-dom";

import StoreCollections from "pages/store/Collections";
import StoreHome from "pages/store/Home";
import StoreProductsList from "pages/store/products/List";
import StoreProductDetails from "pages/store/products/Details";
import StoreCart from "pages/store/Cart";
import StoreAuthSignin from "pages/store/auth/Signin";
import StoreAuthSignup from "pages/store/auth/Signup";
import StoreAuthVerifyLink from "pages/store/auth/VerifyLink";
import StoreCheckout from "pages/store/checkout/Checkout";
import StoreNotFound from "pages/store/404";
import StoreAccount from "pages/store/account/Orders";

import CartProvider from "context/CartContext";

const Store = () => {
  return (
    <CartProvider>
      <Switch>
        <Route exact path="/" component={StoreHome} />
        <Route path="/checkout/" component={StoreCheckout} />
        <Route path="/cart" component={StoreCart} />
        <Route path="/shop" component={StoreCollections} />
        <Route path="/products/:collection" component={StoreProductsList} />
        <Route path="/products/" component={StoreProductsList} />
        <Route path="/product/:id" component={StoreProductDetails} />
        <Route path="/verification/:token" component={StoreAuthVerifyLink} />
        <Route path="/signin" component={StoreAuthSignin} />
        <Route path="/signup" component={StoreAuthSignup} />
        <Route path="/account" component={StoreAccount} />
        <Route path="*" component={StoreNotFound} />
      </Switch>
    </CartProvider>
  );
};

export default Store;
