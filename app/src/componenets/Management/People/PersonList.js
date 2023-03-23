import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getFaculty,
  getGraduates,
  removeAllFaculty,
  removeAllGraduates,
} from "../../../functions/databaseFunctions";

import PersonItem from "./PersonItem";

import styles from "./PersonList.module.css";
import LoadingSpinner from "../../Layout/LoadingSpinner";
import PurgeTable from "../../Layout/PurgeTable";
import { c } from "../../../functions/utils";

function PersonList(props) {
  const [data, setData] = useState();

  const queryClient = useQueryClient();
  const graduatesQuery = useQuery({
    queryKey: ["getGraduates"],
    queryFn: getGraduates,
    enabled: props.type === "student",
  });
  const facultyQuery = useQuery({
    queryKey: ["getFaculty"],
    queryFn: getFaculty,
    enabled: props.type === "faculty",
  });

  const removeAllGraduatesMutation = useMutation({
    mutationFn: removeAllGraduates,
    onSuccess: () => queryClient.fetchQuery(["getGraduates"]),
  });
  const removeAllFacultyMutation = useMutation({
    mutationFn: removeAllFaculty,
    onSuccess: () => queryClient.fetchQuery(["getFaculty"]),
  });

  useEffect(() => {
    switch (props.type) {
      case "student":
        if (graduatesQuery.data) setData(graduatesQuery.data);
        break;

      case "faculty":
        if (facultyQuery.data) setData(facultyQuery.data);
        break;

      default:
        break;
    }
  }, [graduatesQuery.data, facultyQuery.data, props.type]);

  function clearData() {
    props.type === "student"
      ? removeAllGraduatesMutation.mutate()
      : removeAllFacultyMutation.mutate();
  }

  if (
    (props.type === "student" && graduatesQuery.isLoading) ||
    (props.type === "faculty" && facultyQuery.isLoading)
  )
    return <LoadingSpinner />;

  if (!data) return <p>No data :(</p>;

  const items = data
    .sort((a, b) => (a.lastName > b.lastName ? 1 : -1))
    .map((person, i) => {
      return (
        <li key={i}>
          <PersonItem type={props.type} graduate={person} />
        </li>
      );
    });

  return (
    <React.Fragment>
      <ul className={c("container")}>{items}</ul>
      <PurgeTable onClickClear={clearData} />
    </React.Fragment>
  );
}

export default PersonList;
