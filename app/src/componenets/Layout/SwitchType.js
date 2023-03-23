import React from "react";

import styles from "./SwitchType.module.css";

function SwitchType(props) {
  function typeChangeHandler(e) {
    props.setType(e.target.value);
  }
  return (
    <React.Fragment>
      <input
        type="radio"
        id="student"
        name="type"
        value="student"
        onClick={typeChangeHandler}
        defaultChecked={true}
      />
      <label htmlFor="student">Student</label>

      <input
        type="radio"
        id="faculty"
        name="type"
        value="faculty"
        onClick={typeChangeHandler}
      />
      <label htmlFor="faculty">Faculty</label>
    </React.Fragment>
  );
}

export default SwitchType;
