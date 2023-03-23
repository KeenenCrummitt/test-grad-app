import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { c } from "../../functions/utils";

import {
  getDepartment,
  getFacultyMember,
  getGraduate,
  removeAttendee,
} from "../../functions/databaseFunctions";

function AttendeeItem(props) {
  const [person, setPerson] = useState();
  const [dep, setDep] = useState();

  const queryClient = useQueryClient();
  const removeAttendeeMutation = useMutation({
    mutationFn: removeAttendee,
    onSuccess: () => queryClient.fetchQuery(["getAttendees"]),
  });

  const attendee = props.attendee;

  function removeAttendeeHandler(e) {
    e.preventDefault();
    removeAttendeeMutation.mutate({ id: attendee.id });
  }

  useEffect(() => {
    async function getGrad() {
      const fetchPerson =
        attendee.type === "student"
          ? await getGraduate(attendee.personId)
          : await getFacultyMember(attendee.personId);

      if (!fetchPerson) console.error("No person in database");

      const fetchDep = await getDepartment(fetchPerson.departmentId);
      setDep(fetchDep);
      setPerson(fetchPerson);
    }
    getGrad();
  }, [attendee.personId, attendee]);

  return (
    <div className={c("item", "grid-container-inline")}>
      <div className={c("itemField")}>
        <strong>
          {person && person?.firstName} {person && person?.lastName}
        </strong>
      </div>
      <div className={c("itemField")}>{dep && dep?.department}</div>
      <button onClick={removeAttendeeHandler} className={c("coolBtn")}>
        Remove
      </button>
    </div>
  );
}

export default AttendeeItem;
