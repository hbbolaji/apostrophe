import React, { createContext, useContext, useEffect, useState } from "react";

type AuthType = {
  token: string;
  sendToken: (token: string) => void;
};

const AuthContext = createContext<AuthType>({
  token: "",
  sendToken: (token) => {},
});
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [token, setToken] = useState<string>("");

  const sendToken = (token: string) => {
    setToken(token);
  };

  useEffect(() => {
    setToken(sessionStorage.getItem("token") || "");
  }, []);

  return (
    <AuthContext.Provider value={{ token, sendToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
