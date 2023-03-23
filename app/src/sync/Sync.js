import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import styles from "./Sync.module.css";

function Sync() {
  const [refresh, setRefresh] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  return (
    <header className={styles.header}>
      <input
        type="checkbox"
        id="refresh"
        onChange={() => setRefresh((prev) => !prev)}
        className={styles.checkbox}
      />
      <label
        htmlFor="refresh"
        className={styles.label}
        onMouseEnter={() => {
          setTooltip(true);
        }}
        onMouseOut={() => {
          setTooltip(false);
        }}
      >
        Auto Refresh
      </label>
      {tooltip && (
        <p className={styles.tooltip}>
          Re-fetch data from database every 5 seconds.
        </p>
      )}
      {refresh ? <Refresh /> : ""}
    </header>
  );
}

function Refresh() {
  const queryClient = useQueryClient();

  const refreshTime = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("refresh");
      queryClient.refetchQueries();
    }, refreshTime);

    return () => {
      clearInterval(interval);
    };
  }, [queryClient]);
}

export default Sync;
