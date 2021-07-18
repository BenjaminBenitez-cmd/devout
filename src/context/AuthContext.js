import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const userToken = window.localStorage.getItem("user") || null;

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (!userToken) {
      return setAuthenticated(false);
    }
    const decoded = jwtDecode(userToken.token);
    const currentTime = new Date();
    if (decoded.exp < currentTime) {
      return setAuthenticated(false);
    }
    setAuthenticated(true);
  }, [userToken]);

  const defaultContext = {
    authenticated,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
