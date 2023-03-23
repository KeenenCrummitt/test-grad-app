import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { addManager } from "../../../functions/databaseFunctions";
import LoginContext from "../../../store/login-context";

import { c } from "../../../functions/utils";
import styles from "./AddManagerForm.module.css";

function AddManagerForm() {
  const queryClient = useQueryClient();
  const managerMutation = useMutation({
    mutationFn: () =>
      addManager({ email: enteredEmail, password: enteredPassword, admin }),
    onSuccess: () => queryClient.fetchQuery(["getManagers"]),
  });

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const emailValid = enteredEmail.includes("@");
  const passwordValid = enteredPassword.length > 5;

  const loginCtx = useContext(LoginContext);

  function formSubmitHandler(e) {
    e.preventDefault();

    if (!validateForm()) return;

    managerMutation.mutate({
      email: enteredEmail,
      password: enteredPassword,
      admin,
    });
  }

  function validateForm() {
    if (!loginCtx.admin) return;
    if (!loginCtx.loggedIn) return;
    if (!emailValid) return;
    if (!passwordValid) return;

    return true;
  }

  function adminChangeHandler(e) {
    setAdmin((prev) => !prev);
  }
  function emailChangeHandler(e) {
    setEnteredEmail(e.target.value);
  }
  function passwordChangeHandler(e) {
    setEnteredPassword(e.target.value);
  }
  return (
    <form action="" className={c("dataForm")}>
      <input
        type="email"
        onChange={emailChangeHandler}
        placeholder="Email"
        className={c("input")}
      />
      <input
        type="password"
        onChange={passwordChangeHandler}
        placeholder="Password"
        className={c("input")}
      />

      <label htmlFor="admin" className={c(styles.admin)}>
        Admin
        <input id="admin" type="checkbox" onChange={adminChangeHandler} />
      </label>

      <button
        type="submit"
        onClick={formSubmitHandler}
        className={c("coolBtn", "input", styles.addBtn)}
      >
        Add
      </button>
    </form>
  );
}

export default AddManagerForm;
