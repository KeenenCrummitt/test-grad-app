import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./ManagerItem.module.css";
import { removeManager } from "../../../functions/databaseFunctions";
import { c } from "../../../functions/utils";

function ManagerItem(props) {
  const queryClient = useQueryClient();
  const removeAttendeeMutation = useMutation({
    mutationFn: removeManager,
    onSuccess: () => queryClient.fetchQuery(["getManagers"]),
  });

  const manager = props.manager;

  function removeManagerHandler(e) {
    e.preventDefault();
    removeAttendeeMutation.mutate({ id: manager.email });
  }

  return (
    <div className={c("item")}>
      <div className={c("itemField")}>
        <strong>{manager.email}</strong>
      </div>
      <div className={c("itemField")}>
        {manager.admin === "1" ? "Admin" : ""}
      </div>
      <button
        onClick={removeManagerHandler}
        className={c("itemField", "coolBtn")}
      >
        Remove
      </button>
    </div>
  );
}

export default ManagerItem;
