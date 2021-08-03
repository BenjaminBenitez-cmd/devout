import React from "react";
import CategoryRequests from "../../../api/category.requests";
import useNotifications from "../../../hooks/useNotifications";
import ActionButton from "../ActionButton";

const CategoryActionButton = ({ id }) => {
  const { addNotification } = useNotifications();
  const removeCategory = async () => {
    try {
      await CategoryRequests.removeOne(id);
      addNotification("Successfully Deleted Category");
    } catch (err) {
      addNotification("Unable to Delete Category");
    }
  };
  return (
    <ActionButton>
      <li onClick={removeCategory}>Delete</li>
    </ActionButton>
  );
};

export default CategoryActionButton;
