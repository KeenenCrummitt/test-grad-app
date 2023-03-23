import React from "react";
import { c } from "../../functions/utils";

import styles from "./TypeTab.module.css";

function TypeTab(props) {
  const tabs = props.types.map((type, i) => {
    return (
      <button
        key={i}
        className={c(type !== props.activeType ? styles.tab : styles.active)}
        onClick={() => props.typeChangeHandler(type)}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    );
  });

  return (
    <div className={styles.tabs}>
      <div className={styles.container}>{tabs}</div>
    </div>
  );
}

export default TypeTab;
