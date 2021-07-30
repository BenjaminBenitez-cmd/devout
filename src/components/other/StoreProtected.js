import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const StoreProtected = ({ render, ...rest }) => {
  const { authenticated, email } = useAuth();
  const Component = render;

  return (
    <Route
      {...rest}
      render={(props) =>
        email || authenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/checkout/auth",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default StoreProtected;
