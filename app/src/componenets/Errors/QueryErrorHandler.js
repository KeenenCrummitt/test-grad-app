import React from "react";

import styles from "./QueryErrorHandler.module.css";

function QueryErrorHandler() {
  console.error("Query Error");
  return <p>Query Error: Something went wrong</p>;
}

export default QueryErrorHandler;
