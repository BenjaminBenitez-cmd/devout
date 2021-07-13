import React, { useState } from "react";
import FeatherIcons from "feather-icons-react";
//css
import actionstyles from "../../assets/css/action.module.css";
//custom dropdown
import Dropdown from "./Dropdown";
import { useHistory } from "react-router-dom";

const ActionButton = ({ id }) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  //travel to
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  //edit product
  const edit = () => {
    if (id == null) return;
    history.push(`/admin/products/edit/${id}`);
  };

  return (
    <>
      <button onClick={toggle} className={actionstyles.button}>
        <FeatherIcons icon="plus" className="text-light" />
      </button>
      <Dropdown isOpen={isOpen}>
        <li onClick={edit}>Edit</li>
        <li>Delete</li>
      </Dropdown>
    </>
  );
};

export default ActionButton;
