import React, { useContext } from "react";
import { redirect } from "react-router-dom";
import { c } from "../../../functions/utils";
import LoginContext from "../../../store/login-context";

import styles from "./Logout.module.css";

function Logout() {
  const loginCtx = useContext(LoginContext);

  function formSubmitHandler(e) {
    e.preventDefault();

    loginCtx.onLogout();
    return redirect("/check-in");
  }
  return (
    <form action="" className={styles.logoutForm}>
      <button
        type="submit"
        onClick={formSubmitHandler}
        className={c([styles.logout])}
      >
        Logout
      </button>
    </form>
  );
}

export default Logout;
