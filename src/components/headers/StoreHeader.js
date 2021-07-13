import React from "react";
import FeatherIcon from "feather-icons-react";
//info
import headerdata from "../../data/header.json";
//css
import headerstyles from "../../assets/css/header.module.css";
import { NavLink } from "react-router-dom";

const StoreHeader = () => {
  //hook for the dropdown
  return (
    <nav className={headerstyles.container}>
      <span className="text-medium">{headerdata.logo}</span>
      <div>
        <ul className="list-unstyled mb-0 d-flex align-content-end">
          <li className="me-4">
            <NavLink to="/shop">SHOP</NavLink>
          </li>
          <li className="me-4">
            <NavLink to="/">
              <FeatherIcon icon="user" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FeatherIcon icon="shopping-cart" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default StoreHeader;
