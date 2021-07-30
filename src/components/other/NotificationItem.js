import React, { useEffect, useState } from "react";
import styles from "../../assets/css/notification.module.css";
import useNotifications from "../../hooks/useNotifications";

const NotificationItem = ({ message, id }) => {
  const { removeNotification } = useNotifications();
  const [show, setShow] = useState(true);

  const timeOut = () => {
    setTimeout(() => {
      setShow(false);
      removeNotification(id);
    }, 3000);
  };

  const style = show ? { display: "flex" } : { display: "none" };

  useEffect(() => {
    timeOut();
  }, []);

  return (
    <div className={styles.item} style={style}>
      <p className="mb-0">{message}</p>
    </div>
  );
};

export default NotificationItem;
