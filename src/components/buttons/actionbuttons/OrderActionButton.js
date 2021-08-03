import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../ActionButton";

const OrderActionButton = ({ id }) => {
  return (
    <ActionButton>
      <li>
        <Link to={`/admin/orders/${id}`}>View</Link>
      </li>
    </ActionButton>
  );
};

export default OrderActionButton;
