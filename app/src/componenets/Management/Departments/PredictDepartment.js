import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  getDepartments,
  getMatchingDepartments,
} from "../../../functions/databaseFunctions";

import styles from "./PredictDepartment.module.css";

import LoadingSpinner from "../../Layout/LoadingSpinner";
import { c } from "../../../functions/utils";

function PredictDepartment(props) {
  const departmentQuery = useQuery({
    queryKey: ["getDepartments"],
    queryFn: getDepartments,
  });

  const [matches, setMatches] = useState();
  const enteredName = props.enteredName;

  useEffect(() => {
    // set matches to all departments that match
    const fetchMatchingDeps = async () => {
      setMatches(await getMatchingDepartments(enteredName));
    };
    if (departmentQuery.data) fetchMatchingDeps();
  }, [departmentQuery.data, enteredName]);

  if (departmentQuery.isLoading) return <LoadingSpinner />;

  let depJSX = <p>No matching departments :(</p>;

  if (matches) {
    if (matches.length > 0) {
      depJSX = matches.map((dep) => {
        return (
          <li key={dep.id} className={c(styles.predictItem)}>
            <strong onClick={() => props.onSelectDep(dep.id)}>
              {dep.department}
            </strong>
          </li>
        );
      });
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={c(styles.title)}>Select Department</h3>
      <ul className={c(styles.depList)}>{depJSX}</ul>
    </div>
  );
}

export default PredictDepartment;
