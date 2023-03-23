import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { removeDepartment } from "../../../functions/databaseFunctions";
import { c } from "../../../functions/utils";

import styles from "./DepartmentItem.module.css";

function DepartmentItem(props) {
  const queryClient = useQueryClient();
  const departmentMutation = useMutation({
    mutationFn: removeDepartment,
    onSuccess: () => queryClient.fetchQuery(["getDepartments"]),
  });

  const department = props.department;

  function removeHandler(e) {
    e.preventDefault();

    departmentMutation.mutate({ id: department.id });
  }

  return (
    <React.Fragment>
      <strong className={c("itemField")}>{department.department}</strong>
      <span className={styles.id}>Id: {department.id}</span>
      <button onClick={removeHandler} className={c("itemField", "coolBtn")}>
        Remove
      </button>
    </React.Fragment>
  );
}

export default DepartmentItem;
