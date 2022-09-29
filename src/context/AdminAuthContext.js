import { createContext, useState } from "react";
import {
  clearLocalStorage,
  saveUserToLocalStorage,
} from "helpers/localstorage";

export const AdminAuth = createContext();

const AdminAuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState();
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

  let defaultContext = {
    signIn,
    logOut,
    setAuthenticated,
    authenticated,
  };

  return (
    <AdminAuth.Provider value={defaultContext}>{children}</AdminAuth.Provider>
  );
};
