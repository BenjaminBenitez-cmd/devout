import React from "react";
//info
import headerdata from "../../data/header.json";
//css
import headerstyles from "../../assets/css/header.module.css";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
// import useCount from "../../hooks/useCount";

const StoreHeader = () => {
  //global auth state
  const { authenticated } = useAuth();
  //hook for the dropdown
  const { state } = useCart();

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
            <NavLink to="/cart">CART {state.length}</NavLink>
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
