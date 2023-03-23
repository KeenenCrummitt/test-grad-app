import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useRefresh() {
  const [intervalId, setIntervalId] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {});

  useEffect(() => {
    if (!refresh) {
      clearInterval(intervalId);
    }
  }, [refresh, intervalId]);

  function toggleRefresh() {
    setRefresh((prev) => !prev);
  }

  return toggleRefresh;
}
