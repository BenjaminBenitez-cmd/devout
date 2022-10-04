import React from "react";
import { Link } from "react-router-dom";
import ProductRequests from "api/product.requests";
import useNotifications from "hooks/useNotifications";
import ActionButton from "components/buttons/Action";

const ProductActionButton = ({ id }) => {
  const { addNotification } = useNotifications();
  const removeProduct = async () => {
    try {
      await ProductRequests.removeOne(id);
      addNotification("Successfully Deleted Product");
    } catch (err) {
      addNotification("Unable to Delete Product");
    }
  };
  return (
    <ActionButton>
      <li>
        <Link to={`/admin/products/${id}/edit/`}>Edit</Link>
      </li>
      <li onClick={removeProduct}>Delete</li>
    </ActionButton>
  );
};

export default ProductActionButton;
