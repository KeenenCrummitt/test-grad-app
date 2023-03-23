import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { AddDepartment } from "../../../functions/databaseFunctions";

import { c } from "../../../functions/utils";
import styles from "./AddDepartmentForm.module.css";

function AddDepartmentForm() {
  const queryClient = useQueryClient();
  const departmentMutation = useMutation({
    mutationFn: AddDepartment,
    onSuccess: () => queryClient.fetchQuery(["getDepartments"]),
  });

  const [enteredDep, setEnteredDep] = useState("");
  const departmentRef = useRef();

  function formSubmitHandler(e) {
    e.preventDefault();

    if (departmentRef.current.value.length < 4) return;

    departmentMutation.mutate({ name: departmentRef.current.value });

    //clear data and input fields
    setEnteredDep("");
    departmentRef.current.focus();
  }

  function depChangeHandler() {
    setEnteredDep(departmentRef.current.value);
  }
  return (
    <form action="" className={c("dataForm")}>
      <input
        id="dep"
        type="text"
        placeholder="Department Name"
        ref={departmentRef}
        value={enteredDep}
        onChange={depChangeHandler}
        className={c("input")}
      />

      <button
        type="submit"
        onClick={formSubmitHandler}
        className={c("input", "coolBtn", styles.addBtn)}
      >
        Add
      </button>
    </form>
  );
}

export default AddDepartmentForm;
