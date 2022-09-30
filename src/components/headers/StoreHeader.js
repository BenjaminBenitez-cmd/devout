import React from "react";
import { Link, NavLink } from "react-router-dom";

import useAuth from "hooks/useAuth";
import useCart from "hooks/useCart";
// import useCount from "../../hooks/useCount";

import headerstyles from "assets/css/header.module.css";
import headerdata from "data/header.json";

const StoreHeader = () => {
  //global auth items
  const { authenticated } = useAuth();
  //hook for the dropdown
  const { items } = useCart();

  return (
    <nav className={headerstyles.container}>
      <Link to="/">
        <span className="text-medium">{headerdata.logo}</span>
      </Link>
      <div>
        <ul className="list-unstyled mb-0 d-flex align-content-end">
          <li className="me-4">
            <NavLink to="/shop">SHOP</NavLink>
          </li>
          <li className="me-4">
            <NavLink to="/cart">CART {items.length}</NavLink>
          </li>
          {authenticated ? (
            <li>
              <NavLink to="/account/orders">Account</NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/signin">SIGN IN</NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default StoreHeader;
