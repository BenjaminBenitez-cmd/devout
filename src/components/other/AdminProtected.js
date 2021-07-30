import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminProtected = ({ component, ...rest }) => {
  const { adminAuthenticated } = useAuth();
  const Component = component;
  return (
    <Route
      {...rest}
      render={(props) =>
        adminAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminProtected;
