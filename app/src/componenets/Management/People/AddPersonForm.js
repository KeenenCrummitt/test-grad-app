import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addGraduate,
  addFaculty,
  getDepartment,
} from "../../../functions/databaseFunctions";

import FormError from "../../Errors/FormError";

import PredictDep from "../../../componenets/Management/Departments/PredictDepartment";

import { c } from "../../../functions/utils";
import styles from "./AddPersonForm.module.css";

function AddPersonForm(props) {
  const queryClient = useQueryClient();

  const addGraduateMutation = useMutation({
    mutationFn: addGraduate,
    onSuccess: () => queryClient.fetchQuery(["getGraduates"]),
  });
  const addFacultyMutation = useMutation({
    mutationFn: addFaculty,
    onSuccess: () => queryClient.fetchQuery(["getFaculty"]),
  });

  const [enteredFistName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [depId, setDepId] = useState(-1);
  const [enteredEmail, setEnteredEmail] = useState("");
  const platRef = useRef();

  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [showDepError, setShowDepError] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [enteredDep, setEnteredDep] = useState("");

  // input refs
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const depRef = useRef();
  const emailRef = useRef();

  // validity
  const firstNameValid =
    enteredFistName.length < 70 && enteredFistName.length >= 3;
  const lastNameValid =
    enteredLastName.length < 70 && enteredLastName.length >= 3;
  const depValid = depId !== -1;
  const emailValid = enteredEmail.includes("@");

  async function formSubmitHandler(e) {
    e.preventDefault();

    setAllTouched(true);

    // only show department error on form submit
    if (!depValid) setShowDepError(true);

    if (!firstNameValid || !lastNameValid || !depValid || !emailValid) {
      return;
    }

    props.type === "student"
      ? addGraduateMutation.mutate({
          firstName: enteredFistName,
          lastName: enteredLastName,
          departmentId: depId,
          email: enteredEmail,
          platinum: platRef.current.checked,
        })
      : addFacultyMutation.mutate({
          firstName: enteredFistName,
          lastName: enteredLastName,
          departmentId: depId,
          email: enteredEmail,
        });

    // clear fields
    clearAllFields();
    setAllTouched(false);

    firstNameRef.current.focus();
  }

  /*************************** Helper Functions ********************************/

  function setAllTouched(touched) {
    setFirstNameTouched(touched);
    setLastNameTouched(touched);
    setEmailTouched(touched);
  }
  const clearAllFields = useCallback(() => {
    setEnteredFirstName("");
    setEnteredLastName("");
    setEnteredEmail("");
    setEnteredDep("");
    setDepId(-1);
    if (props.type === "student") platRef.current.checked = false;
  }, [props.type]);

  // get selected department name
  useEffect(() => {
    async function getDepName() {
      const fetchDepName = (await getDepartment(depId)).department;
      console.log(fetchDepName);
      setEnteredDep(fetchDepName);
    }

    if (depId === -1) return;
    getDepName();
  }, [depId]);

  // reset form fields on type change
  useEffect(() => {
    clearAllFields();
    setAllTouched(false);
  }, [props.type, clearAllFields]);

  /*************************** Form change handlers ********************************/
  function firstNameChangeHandler(e) {
    setEnteredFirstName(e.target.value);
  }

  function firstNameBlurHandler(e) {
    setFirstNameTouched(true);
  }
  function lastNameChangeHandler(e) {
    setEnteredLastName(e.target.value);
  }

  function lastNameBlurHandler(e) {
    setLastNameTouched(true);
  }

  function emailChangeHandler(e) {
    setEnteredEmail(e.target.value);
  }

  function emailBlurHandler(e) {
    setEmailTouched(true);
  }

  function depChangeHandler(e) {
    setEnteredDep(e.target.value);

    setDepId(-1);
  }

  function selectDepartment(id) {
    setDepId(id);
    setShowDepError(false);
  }

  return (
    <React.Fragment>
      <form action="#" className={c("dataForm")}>
        {/*************************** Name *******************************/}
        <input
          name="firstName"
          type="text"
          ref={firstNameRef}
          value={enteredFistName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          placeholder="First Name"
          className={c("textField", "input")}
        />
        {!firstNameValid && firstNameTouched && (
          <FormError
            title="Error first name Invalid"
            message="Name must be more than 2 letters and less than 71"
          />
        )}

        <input
          name="lastName"
          type="text"
          ref={lastNameRef}
          value={enteredLastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          placeholder="Last Name"
          className={c("textField", "input")}
        />
        {!lastNameValid && lastNameTouched && (
          <FormError
            title="Error last name Invalid"
            message="Name must be more than 2 letters and less than 71"
          />
        )}
        {/*************************** email *******************************/}
        <input
          name="email"
          type="email"
          ref={emailRef}
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          placeholder="Email"
          className={c("textField", "input")}
        />
        {!emailValid && emailTouched && (
          <FormError
            title="Error Email Invalid"
            message="Email must be a vaild email address!"
          />
        )}
        {/*************************** Department *******************************/}
        <input
          name="dep"
          type="text"
          ref={depRef}
          value={enteredDep}
          onChange={depChangeHandler}
          placeholder="Department"
          className={c("textField", "input")}
        />
        {
          // only show department error on form submit
          !depValid && showDepError && (
            <FormError
              title="Error Department Invalid"
              message="Please select department"
            />
          )
        }

        {!depValid && enteredDep.length > 0 && (
          <PredictDep enteredName={enteredDep} onSelectDep={selectDepartment} />
        )}

        {/*************************** Platinum *******************************/}
        {props.type === "student" && (
          <div className={c(styles.plat)}>
            <label htmlFor="platinum" className={c(styles.label)}>
              Platinum Performer
            </label>
            <input
              id="platinum"
              type="checkbox"
              ref={platRef}
              className={c(styles.checkBox)}
            />
          </div>
        )}

        <button
          type="submit"
          onClick={formSubmitHandler}
          className={c("input", "coolBtn", styles.submitBtn)}
        >
          Add
        </button>
      </form>
    </React.Fragment>
  );
}

export default AddPersonForm;
