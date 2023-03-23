import React, { useContext, useState } from "react";

import PersonList from "../componenets/Management/People/PersonList";
import AddPersonForm from "../componenets/Management/People/AddPersonForm";

import styles from "./People.module.css";
import LoginContext from "../store/login-context";
import { Navigate } from "react-router-dom";
import TypeTab from "../componenets/Layout/TypeTab";
import PageTitle from "../componenets/Layout/PageTitle";
import Redirect from "../componenets/Management/Login/Redirect";
import ImportCSV from "../componenets/Import/ImportCSV";

function People() {
  const loginCtx = useContext(LoginContext);
  const [type, setType] = useState("student");

  function typeChangeHandler(value) {
    setType(value);
  }

  return (
    <section className={styles.people}>
      <PageTitle title="Attendees" />

      <Redirect admin={false} />

      <TypeTab
        types={["student", "faculty"]}
        activeType={type}
        typeChangeHandler={typeChangeHandler}
      />

      <ImportCSV type={type} />
      <p className={styles.or}>or</p>
      <AddPersonForm type={type} />

      <PersonList type={type} />
    </section>
  );
}

export default People;
