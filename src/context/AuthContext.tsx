import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthType } from "../utils/types";

const AuthContext = createContext<AuthType>({
  token: "",
  currentUser: {},
  sendToken: (token) => {},
});
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [currentUser, setCurrentUser] = useState({});

  const sendToken = (token: string) => {
    setToken(token);
  };

  const getCurrentUser = async () => {
    if (token) {
      const result = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/user`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(result.data.data);
      sessionStorage.setItem("user", result.data.data);
    }
  };

  useEffect(() => {
    setToken(sessionStorage.getItem("token") || "");
  }, []);

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, currentUser, sendToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
