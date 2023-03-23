import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginContext from "../../../store/login-context";

function Redirect(props) {
  const loginCtx = useContext(LoginContext);

  // sorry about this mess
  let should = true;
  if (props.admin) {
    if (loginCtx.loggedIn && loginCtx.admin) should = false;
  } else {
    if (loginCtx.loggedIn) {
      should = false;
    }
  }

  return (
    <React.Fragment>{should && <Navigate replace to="/" />}</React.Fragment>
  );
}

export default Redirect;
