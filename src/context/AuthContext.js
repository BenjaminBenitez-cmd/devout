import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {
  clearLocalStorage,
  getAdminFromLocalStorage,
  getUserFromLocalStorage,
  saveAdminToLocalStorage,
  saveUserToLocalStorage,
} from "../helpers/localstorage";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const userToken = getUserFromLocalStorage();
  const adminToken = getAdminFromLocalStorage();
  const [email, setEmail] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  //logout function
  const logOut = () => {
    clearLocalStorage();
    setAuthenticated(false);
    window.location.reload();
  };

  //signin function
  const signIn = (user) => {
    saveUserToLocalStorage(user);
    setAuthenticated(true);
  };

  const signInAdmin = (admin) => {
    saveAdminToLocalStorage(admin);
    setAdminAuthenticated(true);
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
  useEffect(() => {
    if (!adminToken) {
      return setAdminAuthenticated(false);
    }
    //decode the jwt token
    const decoded = jwtDecode(adminToken.token);
    //get time
    const currentTime = new Date().getTime() / 1000;

    if (decoded.exp < currentTime) {
      clearLocalStorage();
      return setAuthenticated(false);
    }
    setAdminAuthenticated(true);
  }, [adminToken]);

  const defaultContext = {
    signInAdmin,
    adminAuthenticated,
    authenticated,
    email,
    setEmail,
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
