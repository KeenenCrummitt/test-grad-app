import React, { useContext, useState } from "react";
import { getManager } from "../../../functions/databaseFunctions";
import { c } from "../../../functions/utils";
import LoginContext from "../../../store/login-context";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const loginCtx = useContext(LoginContext);

  async function formSubmitHandler(e) {
    e.preventDefault();

    const manager = await getManager(enteredEmail);

    if (!manager) return;

    if (enteredPassword !== manager.password + "") return;

    loginCtx.onLogin(manager.admin === "1");
  }

  function emailChangeHandler(e) {
    setEnteredEmail(e.target.value);
  }
  function passwordChangeHandler(e) {
    setEnteredPassword(e.target.value);
  }

  return (
    <form action="" className={c(styles.loginForm)}>
      <input
        type="email"
        placeholder="email"
        onChange={emailChangeHandler}
        className={c([styles.input])}
      />
      <input
        type="password"
        placeholder="password"
        onChange={passwordChangeHandler}
        className={c([styles.input])}
      />
      <button
        type="submit"
        onClick={formSubmitHandler}
        className={c([styles.btn])}
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
