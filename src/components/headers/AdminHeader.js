import React from "react";
import FeatherIcon from "feather-icons-react";
//info
import headerdata from "../../data/header.json";
//css
import headerstyles from "../../assets/css/header.module.css";
import useDropdown from "../../hooks/useDropdown";
import Dropdown from "../buttons/Dropdown";
import useAuth from "../../hooks/useAuth";

const AdminHeader = () => {
  //hook for the dropdown
  const { isOpen, toggleOpen, ref } = useDropdown();
  const { logOut } = useAuth();
  return (
    <div className={headerstyles.container}>
      <span className="text-medium">{headerdata.logo}</span>
      <div>
        <FeatherIcon icon="user" onClick={toggleOpen} />
        <Dropdown ref={ref} isOpen={isOpen}>
          <li onClick={logOut}>Logout</li>
        </Dropdown>
      </div>
    </div>
  );
};

export default AdminHeader;
