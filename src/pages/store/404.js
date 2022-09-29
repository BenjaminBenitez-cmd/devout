import React from "react";
import { NavLink } from "react-router-dom";
import LayoutStoreHome from "layouts/LayoutStoreHome";

const StoreNotFound = () => {
  return (
    <LayoutStoreHome>
      <div className="section w-100 d-flex justify-content-center">
        <div>
          <h1 className="text-extra-large">404</h1>
          <p className="text-extrasmall text-upper">
            It's Okay Mistakes happen.{" "}
            <NavLink className="text-extrasmall text-bold" to="/products">
              Return
            </NavLink>
          </p>
        </div>
      </div>
    </LayoutStoreHome>
  );
};

export default StoreNotFound;
