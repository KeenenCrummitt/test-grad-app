import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAttendees } from "../../functions/databaseFunctions";

import styles from "./AttendeeList.module.css";

import AttendeeItem from "./AttendeeItem";
import LoadingSpinner from "../Layout/LoadingSpinner";
import { c } from "../../functions/utils";
import QueryErrorHandler from "../Errors/QueryErrorHandler";

function AttendeeList(props) {
  const attendeesQuery = useQuery({
    queryKey: ["getAttendees"],
    queryFn: getAttendees,
  });

  if (attendeesQuery.isLoading) return <LoadingSpinner />;

  if (attendeesQuery.isError)
    return <QueryErrorHandler result={attendeesQuery} />;

  if (!attendeesQuery.data) return;

  const filteredAttendees = attendeesQuery.data.filter(
    (attendee) => attendee.type === props.type
  );

  const attendeeItems = filteredAttendees.map((attendee) => {
    return (
      <li key={attendee.id}>
        {attendee && <AttendeeItem attendee={attendee} />}
      </li>
    );
  });

  return (
    <React.Fragment>
      <ul className={c("container")}>{attendeeItems}</ul>
    </React.Fragment>
  );
}

export default AttendeeList;
