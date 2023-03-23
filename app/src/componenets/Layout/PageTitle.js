import React from "react";

import styles from "./PageTitle.module.css";

function PageTitle(props) {
  return <h2 className={styles.header}>{props.title}</h2>;
}

export default PageTitle;
