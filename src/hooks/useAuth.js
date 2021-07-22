import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { signIn, logOut, authenticated } = useContext(AuthContext);
  return { signIn, logOut, authenticated };
};

export default useAuth;
