import React from "react";

import styles from "./FormError.module.css";

function FormError(props) {
  return (
    <div className={styles.error}>
      <h4 className={styles.title}>{props.title}</h4>
      <p className={styles.message}>{props.message}</p>
    </div>
  );
}

export default FormError;
