import React, { useEffect, useRef, useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { c } from "../../functions/utils";
import styles from "./CheckInForm.module.css";

import { addAttendee, getAttendees } from "../../functions/databaseFunctions";
import Predict from "./Predict";
import Signature from "./Signature";

function CheckInForm(props) {
  const queryClient = useQueryClient();
  const attendeesQuery = useQuery({
    queryKey: ["getAttendees"],
    queryFn: getAttendees,
  });
  const addAttendeeMutation = useMutation({
    mutationFn: addAttendee,
    onSuccess: () => queryClient.fetchQuery(["getAttendees"]),
  });

  const nameRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [person, setPerson] = useState();
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    if (props.type === "student") setSigned(true);
    else setSigned(false);
  }, [props.type]);

  // if (attendeesQuery.isLoading) return <LoadingSpinner />;

  async function formSubmitHandler(e) {
    e.preventDefault();

    if (!person) return;

    if (!signed && props.type === "faculty") return;

    if (
      person.id ===
      attendeesQuery.data
        .filter((att) => att.type === props.type)
        .find((att) => att.personId === person.id)
    )
      return;

    //clear data and input fields
    setPerson(null);
    setEnteredName("");
    props.type === "faculty" && setSigned(false);
    // focus on the input field after submission
    nameRef.current.focus();

    // add person
    add(person.id);
  }

  async function add(personId) {
    if (personId === undefined || personId === null) return;
    addAttendeeMutation.mutate({ type: props.type, id: personId });
  }

  function selectPerson(selectedPerson) {
    setEnteredName(`${selectedPerson.firstName} ${selectedPerson.lastName}`);
    setPerson(selectedPerson);
  }
  function onSignatureChange() {
    setSigned((prev) => !prev);
  }

  function firstNameChangeHandler(e) {
    const name = e.target.value;
    setEnteredName(name);
  }
  function firstNameClickHandler() {
    setPerson(null);
  }

  // predict component based on student or faculty
  let predictJSX = enteredName.length > 0 && (
    <Predict
      type={props.type}
      enteredName={enteredName}
      clickHandler={selectPerson}
    />
  );

  return (
    <form
      action="#"
      className={c("class of coolness (after all, why not?)", styles.form)}
    >
      <div className={c(styles.nameInput)}>
        <input
          className={c(styles.input, styles.center)}
          name="firstName"
          type="text"
          value={enteredName}
          ref={nameRef}
          onChange={firstNameChangeHandler}
          onClick={firstNameClickHandler}
          placeholder="Enter Name"
        />
        <button
          type="submit"
          className={c("coolBtn", styles.addBtn)}
          disabled={!signed}
          onClick={formSubmitHandler}
        >
          Check In
        </button>
      </div>

      {props.type === "faculty" && (
        <Signature
          onSignedChanged={onSignatureChange}
          signed={signed}
          person={person}
        />
      )}

      {!person && predictJSX}
    </form>
  );
}

export default CheckInForm;
