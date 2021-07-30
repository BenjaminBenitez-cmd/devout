import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const {
    signIn,
    logOut,
    authenticated,
    email,
    setEmail,
    signInAdmin,
    adminAuthenticated,
  } = useContext(AuthContext);
  return {
    signIn,
    logOut,
    authenticated,
    email,
    setEmail,
    signInAdmin,
    adminAuthenticated,
  };
};

export default useAuth;
