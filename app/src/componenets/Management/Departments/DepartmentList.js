import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getDepartments } from "../../../functions/databaseFunctions";
import { c } from "../../../functions/utils";
import LoadingSpinner from "../../Layout/LoadingSpinner";
import DepartmentItem from "./DepartmentItem";

import styles from "./DepartmentList.module.css";

function DepartmentList() {
  const departmentsQuery = useQuery({
    queryKey: ["getDepartments"],
    queryFn: getDepartments,
  });

  if (departmentsQuery.isLoading) return <LoadingSpinner />;

  if (!departmentsQuery.data) return <p>No data :(</p>;

  const items = departmentsQuery.data
    .sort((a, b) => (a.department > b.department ? 1 : -1))
    .map((dep, i) => {
      return (
        <li key={i} className={c("item")}>
          <DepartmentItem department={dep} />
        </li>
      );
    });

  return (
    <React.Fragment>
      <ul className={c("container")}>{items}</ul>
    </React.Fragment>
  );
}

export default DepartmentList;
