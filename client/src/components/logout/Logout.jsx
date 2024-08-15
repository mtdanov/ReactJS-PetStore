import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import * as authService from "../../services/authService";
import Path from "../../path";

export default function Logout() {
  const navigate = useNavigate();
  const { logoutHandler } = useContext(AuthContext);

  useEffect(() => {
    authService
      .logout()
      .then(() => {
        logoutHandler();
        navigate(Path.Home);
      })
      .catch((err) => {
        logoutHandler();
        navigate(Path.Login);
        throw err;
      });
  }, []);

  return null;
}


