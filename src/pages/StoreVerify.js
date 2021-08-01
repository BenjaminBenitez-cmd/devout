import React from "react";
import { useQuery } from "react-query";
import { NavLink, useParams } from "react-router-dom";
import AuthRequests from "../api/auth.requests";
import LayoutStoreHome from "../layouts/LayoutStoreHome";

const StoreVerify = () => {
  const { token } = useParams();
  //use query to handle data fetching

  const { isLoading, error, data } = useQuery(
    ["verify", token],
    () => AuthRequests.signupverify({ token }),
    //enable if token is present
    { enabled: token ? true : false }
  );

  return (
    <LayoutStoreHome>
      <div className="d-flex section justify-content-center align-items-center">
        {!token && <p>Paste the link in the url bar</p>}
        {isLoading && <p>Hold on ...</p>}
        {data && (
          <p>
            Successfully registered,{" "}
            <NavLink to="/signin" className="text-extrasmall text-bold">
              Signin
            </NavLink>
          </p>
        )}
        {error && <p>Invalid or expired link</p>}
      </div>
    </LayoutStoreHome>
  );
};

export default StoreVerify;
