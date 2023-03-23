import React from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Layout/LoadingSpinner";
import {
  getAttendees,
  getDepartments,
  getGraduates,
} from "../../functions/databaseFunctions";

import styles from "./ThereList.module.css";
import { c } from "../../functions/utils";

function ThereList() {
  const attendeesQuery = useQuery({
    queryKey: ["getAttendees"],
    queryFn: getAttendees,
  });
  const graduatesQuery = useQuery({
    queryKey: ["getGraduates"],
    queryFn: getGraduates,
  });
  const departmentQuery = useQuery({
    queryKey: ["getDepartments"],
    queryFn: getDepartments,
  });

  if (
    attendeesQuery.isLoading ||
    graduatesQuery.isLoading ||
    departmentQuery.isLoading
  )
    return <LoadingSpinner />;

  const filteredGraduates = attendeesQuery.data
    .filter((attendee) => attendee.type === "student")
    .map(
      (attendee) =>
        graduatesQuery.data.filter((grad) => grad.id === attendee.personId)[0]
    );

  const filteredMappedSortedDepIds = [
    ...new Set(
      filteredGraduates.map((grad) => {
        if (!grad) throw new Error("graduate no longer exists");
        return grad.departmentId;
      })
    ),
  ].sort((a, b) =>
    departmentQuery.data.find((dep) => dep.id === a).department >
    departmentQuery.data.find((dep) => dep.id === b).department
      ? 1
      : -1
  );

  const output = filteredMappedSortedDepIds.map((depId) => {
    const grads = filteredGraduates
      .filter((grad) => grad.departmentId === depId)
      .sort((a, b) => (a.lastName > b.lastName ? 1 : -1))
      .map((grad, i) => (
        <li key={i} className={c(styles.thereItem)}>
          <strong className={c("itemField")}>
            {grad.firstName} {grad.lastName}
          </strong>

          {grad.platinum === "1" && (
            <span className={c("itemField")}>Platinum Performer</span>
          )}
        </li>
      ));

    return (
      <React.Fragment>
        <div className={c(styles.departmentSection)}>
          <h2 className={c(styles.department)}>
            {departmentQuery.data.find((dep) => dep.id === depId).department}
          </h2>
          <ul className={c(styles.departmentList)}>{grads}</ul>
        </div>
      </React.Fragment>
    );
  });

  return (
    <section className={c(styles.thereList)}>
      <h1 className={c(styles.title)}>Graduates of June 2023</h1>
      <div>{output}</div>
    </section>
  );
}

export default ThereList;
