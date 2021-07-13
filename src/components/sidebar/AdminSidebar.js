import React from "react";
import { NavLink } from "react-router-dom";
//css
import sidebar from "../../assets/css/sidebar.module.css";
//icons
import FeatherIcon from "feather-icons-react";

const AdminSidebar = () => {
  return (
    <div className="col-sm-2">
      <div className={sidebar.sidebar}>
        <ul className="list-unstyled">
          <NavLink to="/admin/dashboard">
            <li className={sidebar.li}>
              Dashboard <FeatherIcon icon="chevron-right" />
            </li>
          </NavLink>
          <NavLink to="/admin/products">
            <li className={sidebar.li}>
              Products <FeatherIcon icon="chevron-right" />
            </li>
          </NavLink>
          <NavLink to="/admin/products/add">
            <span className={sidebar.subitem}>Add</span>
          </NavLink>

          <NavLink to="/admin/orders">
            <li className={sidebar.li}>
              Orders <FeatherIcon icon="chevron-right" />
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
