import React, { useState } from "react";
import FeatherIcons from "feather-icons-react";
//css
import actionstyles from "../../assets/css/action.module.css";
//custom dropdown
import Dropdown from "./Dropdown";
import { useHistory } from "react-router-dom";
import ProductRequests from "../../api/product.requests";
import OrderRequests from "../../api/order.requests";

const ActionButton = ({ id, redirectTo, children }) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  //travel to
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  //edit product
  const edit = () => {
    if (id == null) return;
    history.push(`/admin/${redirectTo}/edit/${id}`);
  };

  //delete one
  const deleteOne = async () => {
    switch (redirectTo) {
      case "products":
        return await ProductRequests.removeOne(id);
      case "orders":
        return await OrderRequests.removeOne(id);
      default:
        return;
    }
  };

  return (
    <>
      <button onClick={toggle} className={actionstyles.button}>
        <FeatherIcons icon="plus" className="text-light" />
      </button>
      <Dropdown isOpen={isOpen}>
        {children}
        <li onClick={edit}>Edit</li>
        <li onClick={deleteOne}>Delete</li>
      </Dropdown>
    </>
  );
};

export default ActionButton;
