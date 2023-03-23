import React from "react";
import { c } from "../../functions/utils";

import styles from "./PredictionItem.module.css";

function PredictionItem(props) {
  const person = props.person;

  function clickHandler() {
    props.clickHandler(person);
  }

  return (
    <div onClick={clickHandler} className={c(styles.predictItem)}>
      <strong>{person.firstName + " " + person.lastName}</strong>
    </div>
  );
}

export default PredictionItem;
