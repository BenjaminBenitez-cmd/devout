import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const useNotifications = () => {
  const { notifications, addNotification, removeNotification } =
    useContext(NotificationContext);
  return { notifications, addNotification, removeNotification };
};

export default useNotifications;
