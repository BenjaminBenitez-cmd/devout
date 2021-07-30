import React from "react";
import styles from "../../assets/css/notification.module.css";
import useNotifications from "../../hooks/useNotifications";
import NotificationItem from "./NotificationItem";

const Notifications = () => {
  const { notifications } = useNotifications();
  console.log(notifications);
  return (
    <div className={styles.container}>
      {notifications.map((notification, index) => (
        <NotificationItem
          message={notification.message}
          id={notification.id}
          key={index}
        />
      ))}
    </div>
  );
};

export default Notifications;
