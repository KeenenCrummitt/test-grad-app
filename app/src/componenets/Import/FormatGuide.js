import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { c } from "../../functions/utils";

import styles from "./FormatGuide.module.css";

function FormatGuide(props) {
  const descriptionJSX =
    props.type === "student" ? (
      <ol className={styles.list}>
        <li>1st column contains student's first name</li>
        <li>2nd column contains student's last name</li>
        <li>
          3rd column contains the department Id. A list of departments with the
          associating Id can be found in the{" "}
          <NavLink to="/departments" className={styles.depLink}>
            Add Department page
          </NavLink>{" "}
        </li>
        <li>4th column contains student's email address</li>
        <li>
          5th column contains a 1 or a 0 indicating whether or not the student
          is a platinum performer
        </li>
      </ol>
    ) : (
      <ol className={styles.list}>
        <li>1st column contains faculty's first name</li>
        <li>2nd column contains faculty's last name</li>
        <li>
          3rd column contains the department Id. A list of departments with the
          associating Id can be found in the{" "}
          <NavLink to="/departments" className={styles.depLink}>
            Add Department page
          </NavLink>{" "}
        </li>
        <li>4th column contains faculty's email address</li>
      </ol>
    );

  const imgJSX =
    props.type === "student" ? (
      <img src="/studentFormatGuide.png" alt="csv file format guide" />
    ) : (
      <img src="/facultyFormatGuide.png" alt="csv file format guide" />
    );

  function cancelHandler() {
    props.onSelectFile(null);
    props.toggleShow(false);
  }
  function selectHandler(e) {
    props.onSelectFile(e.target.files[0]);
    props.toggleShow(false);
  }

  return (
    <React.Fragment>
      <h3 className={styles.title}>CSV file must be formatted as shown</h3>
      {descriptionJSX}
      {imgJSX}
      <div className={styles.btns}>
        <button onClick={cancelHandler} className={c("coolBtn")}>
          Cancel
        </button>
        <input
          type="file"
          accept=".csv"
          onChange={selectHandler}
          className={c(styles.importInput)}
        />
      </div>
    </React.Fragment>
  );
}

export default FormatGuide;
