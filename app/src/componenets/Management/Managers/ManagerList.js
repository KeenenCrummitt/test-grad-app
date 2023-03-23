import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getManagers } from "../../../functions/databaseFunctions";
import { c } from "../../../functions/utils";
import LoadingSpinner from "../../Layout/LoadingSpinner";
import ManagerItem from "./ManagerItem";

import styles from "./ManagerList.module.css";

function ManagerList() {
  const managersQuery = useQuery({
    queryKey: ["getManagers"],
    queryFn: getManagers,
  });

  if (managersQuery.isLoading) return <LoadingSpinner />;

  const managerItems = managersQuery.data.map((manager, i) => {
    return <li key={i}>{manager && <ManagerItem manager={manager} />}</li>;
  });
  return <ul className={c("container")}>{managerItems}</ul>;
}

export default ManagerList;
