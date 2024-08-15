import { createContext } from "react";
import usePersistedState from "../hooks/usePersistedState";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = usePersistedState("auth", {});

  const changeAuthState = (state) => {
    setAuth(state);
  }

  const logoutHandler = () => {
    setAuth({});
    localStorage.removeItem('auth');
  };


  const values = {
    logoutHandler,
    changeAuthState,
    role: auth.role,
    userId: auth.id,
    username: auth.username,
    email: auth.email,
    accessToken: auth.accessToken,
    isAuthenticated: !!auth.accessToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;
