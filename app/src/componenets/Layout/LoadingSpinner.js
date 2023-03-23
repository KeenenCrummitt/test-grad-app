import React from "react";

import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={styles.parent}>
      <div className={`${styles.loadingSpinner} ${styles.background}`} />
      <div className={`${styles.loadingSpinner} ${styles.b}`} />
    </div>
  );
}

export default LoadingSpinner;
