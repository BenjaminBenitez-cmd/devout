import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {
  clearLocalStorage,
  getUserFromLocalStorage,
  saveUserToLocalStorage,
} from "../helpers/localstorage";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const userToken = getUserFromLocalStorage();
  const [authenticated, setAuthenticated] = useState(false);

  //logout function
  const logOut = () => {
    clearLocalStorage();
    setAuthenticated(false);
  };

  //signin function
  const signIn = (user) => {
    saveUserToLocalStorage(user);
    setAuthenticated(true);
  };

  useEffect(() => {
    if (!userToken) {
      return setAuthenticated(false);
    }
    //decode the jwt token
    const decoded = jwtDecode(userToken.token);
    //get time
    const currentTime = new Date().getTime() / 1000;
    //
    if (decoded.exp < currentTime) {
      clearLocalStorage();
      return setAuthenticated(false);
    }
    setAuthenticated(true);
  }, [userToken]);

  const defaultContext = {
    authenticated,
    logOut,
    signIn,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
