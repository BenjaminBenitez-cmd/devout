import React from "react";
import { Redirect, Route } from "react-router-dom";

import useAuth from "hooks/useAuth";
import useCart from "hooks/useCart";

const StoreProtected = ({ render, ...rest }) => {
  const { items } = useCart();
  const { authenticated, email } = useAuth();
  const Component = render;

  if (items.length <= 0) return <Redirect to="/" />;

  return (
    <Route
      {...rest}
      render={(props) =>
        email || authenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default StoreProtected;
