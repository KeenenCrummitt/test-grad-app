import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  getAttendees,
  getMatchingFaculty,
  getMatchingGraduates,
} from "../../functions/databaseFunctions";
import { c } from "../../functions/utils";
import LoadingSpinner from "../Layout/LoadingSpinner";

import styles from "./Predict.module.css";
import PredictionItem from "./PredictionItem";

function Predict(props) {
  const attendeesQuery = useQuery({
    queryKey: ["getAttendees"],
    queryFn: getAttendees,
  });

  const [matches, setMatches] = useState();
  const enteredName = props.enteredName;

  useEffect(() => {
    // set matches to all graduates that are not currently attending
    const fetchMatchingGraduates = async () => {
      setMatches(
        (await getMatchingGraduates(enteredName)).filter(
          (grad) =>
            !attendeesQuery.data
              .filter((att) => att.type === "student")
              .find((att) => att.personId === grad.id)
        )
      );
    };
    // set matches to all faculty that are not currently attending
    const fetchMatchingFaculty = async () => {
      setMatches(
        (await getMatchingFaculty(enteredName)).filter(
          (fac) =>
            !attendeesQuery.data
              .filter((att) => att.type === "faculty")
              .find((att) => att.personId === fac.id)
        )
      );
    };
    if (attendeesQuery.data) {
      props.type === "student"
        ? fetchMatchingGraduates()
        : fetchMatchingFaculty();
    }
  }, [enteredName, props.type, attendeesQuery.data]);

  if (attendeesQuery.isLoading) return <LoadingSpinner />;

  let graduateJSX = <p>No matching {props.type} :(</p>;

  if (matches) {
    if (matches.length > 0) {
      graduateJSX = matches.map((grad) => {
        return (
          <li key={grad.id}>
            <PredictionItem person={grad} clickHandler={props.clickHandler} />
          </li>
        );
      });
    }
  }

  return <ul className={c(styles.container)}>{graduateJSX}</ul>;
}

export default Predict;
