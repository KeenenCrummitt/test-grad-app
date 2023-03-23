import React from "react";

const LoginContext = React.createContext({
  loggedIn: false,
  admin: false,
  onLogin: () => {},
  onLogout: () => {},
});

export default LoginContext;
