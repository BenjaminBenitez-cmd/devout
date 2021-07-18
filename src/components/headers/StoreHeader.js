import React from "react";
//info
import headerdata from "../../data/header.json";
//css
import headerstyles from "../../assets/css/header.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const StoreHeader = () => {
  //global auth state
  const { authenticated } = useContext(AuthContext);
  //hook for the dropdown
  return (
    <nav className={headerstyles.container}>
      <span className="text-medium">{headerdata.logo}</span>
      <div>
        <ul className="list-unstyled mb-0 d-flex align-content-end">
          <li className="me-4">
            <NavLink to="/shop">SHOP</NavLink>
          </li>
          {authenticated && (
            <li className="me-4">
              <NavLink to="/account">Account</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/cart">CART</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default StoreHeader;
