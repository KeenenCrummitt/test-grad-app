import React, { useState } from "react";

import CheckInForm from "../componenets/Attendance/CheckInForm";
import AttendeeList from "../componenets/Attendance/AttendeeList";

import styles from "./CheckIn.module.css";
import TypeTab from "../componenets/Layout/TypeTab";
import PageTitle from "../componenets/Layout/PageTitle";

function CheckIn() {
  const [type, setType] = useState("student");

  function typeChangeHandler(type) {
    setType(type);
  }
  return (
    <React.Fragment>
      <PageTitle title="Check In" />

      <TypeTab
        types={["student", "faculty"]}
        activeType={type}
        typeChangeHandler={typeChangeHandler}
      />

      <hr className={styles.break} />

      <CheckInForm type={type} />
      <AttendeeList type={type} />
    </React.Fragment>
  );
}

export default CheckIn;
