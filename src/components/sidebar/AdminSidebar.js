import React from "react";
import { NavLink } from "react-router-dom";
//css
import sidebar from "../../assets/css/sidebar.module.css";
//icons
import FeatherIcon from "feather-icons-react";
import { Col } from "reactstrap";

const AdminSidebar = () => {
  return (
    <Col sm={12} md={12} lg={2}>
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
          <NavLink to="/admin/categories">
            <li className={sidebar.li}>
              Categories <FeatherIcon icon="chevron-right" />
            </li>
          </NavLink>
          <NavLink to="/admin/categories/add">
            <span className={sidebar.subitem}>Add</span>
          </NavLink>
        </ul>
      </div>
    </Col>
  );
};

export default AdminSidebar;
