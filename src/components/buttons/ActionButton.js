import React, { useState } from "react";
import FeatherIcons from "feather-icons-react";
//css
import actionstyles from "../../assets/css/action.module.css";
//custom dropdown
import Dropdown from "./Dropdown";

const ActionButton = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  //travel to
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggle} className={actionstyles.button}>
        <FeatherIcons icon="plus" className="text-light" />
      </button>
      <Dropdown isOpen={isOpen}>{children}</Dropdown>
    </>
  );
};

export default ActionButton;
