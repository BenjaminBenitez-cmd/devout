import React, { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotification] = useState([]);

  const addNotification = (message) => {
    setNotification((prev) => {
      return [...prev, { message: message, id: Math.random() }];
    });
  };

  const removeNotification = (id) => {
    setNotification((prev) => prev.filter((items) => items.id !== id));
  };

  useEffect(() => {
    return () => {
      setNotification([]);
    };
  }, []);

  const defaultContext = {
    removeNotification,
    addNotification,
    notifications,
  };

  return (
    <NotificationContext.Provider value={defaultContext}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
