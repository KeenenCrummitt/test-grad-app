import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getDepartment,
  removeFaculty,
  removeGraduate,
} from "../../../functions/databaseFunctions";

import { c } from "../../../functions/utils";
import styles from "./PersonItem.module.css";
import LoadingSpinner from "../../Layout/LoadingSpinner";

function PersonItem(props) {
  const queryClient = useQueryClient();
  const removeStudentMutation = useMutation({
    mutationFn: removeGraduate,
    onSuccess: () => queryClient.fetchQuery(["getGraduates"]),
  });
  const removeFacultyMutation = useMutation({
    mutationFn: removeFaculty,
    onSuccess: () => queryClient.fetchQuery(["getFaculty"]),
  });

  const person = props.graduate;

  const departmentQuery = useQuery({
    queryKey: ["getDepartment", person.departmentId],
    queryFn: () => getDepartment(person.departmentId),
    enabled: !!person,
  });

  if (departmentQuery.isLoading) return <LoadingSpinner />;

  function removeStudentHandler(e) {
    e.preventDefault();
    props.type === "student"
      ? removeStudentMutation.mutate({ id: person.id, type: "student" })
      : removeFacultyMutation.mutate({ id: person.id, type: "faculty" });
  }

  return (
    <div className={c("item", "grid-container-inline")}>
      <div className={c("itemField")}>
        <strong>
          {person.lastName}, {person.firstName}
        </strong>
      </div>
      <div className={c("itemField")}>{departmentQuery.data?.department}</div>
      {+person.platinum ? (
        <div className={c("itemField")}>Platinum Performer</div>
      ) : null}
      <button
        onClick={removeStudentHandler}
        className={c("coolBtn", "itemField")}
      >
        Remove
      </button>
    </div>
  );
}

export default PersonItem;
