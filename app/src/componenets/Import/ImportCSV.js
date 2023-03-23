import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { addFaculty, addGraduate } from "../../functions/databaseFunctions";
import { c } from "../../functions/utils";
import Modal from "../Layout/Modal";
import FormatGuide from "./FormatGuide";

import styles from "./ImportCSV.module.css";

function ImportCSV(props) {
  const [file, setFile] = useState();
  const [showFormatter, setShowFormatter] = useState();

  const fileReader = new FileReader();

  const queryClient = useQueryClient();
  const graduateMutation = useMutation({
    mutationFn: addGraduate,
    onSuccess: () => queryClient.fetchQuery(["getGraduates"]),
  });
  const facultyMutation = useMutation({
    mutationFn: addFaculty,
    onSuccess: () => queryClient.fetchQuery(["getFaculty"]),
  });

  function onSelectFile(file) {
    setFile(file);
    console.log(file);
  }

  function parseCsv(contents) {
    // const header = contents.slice(0, contents.indexOf("\n")).split(", ");
    const rows = contents
      .slice(0)
      .split("\n")
      .map((row) => row.slice(0, row.indexOf("\r")).split(","));

    //remove empty last row
    rows.pop();

    return rows;
  }

  function addGraduates(data) {
    console.log(data);
    data.forEach((student, i) => {
      const firstName = student[0];
      const lastName = student[1];
      const departmentId = student[2];
      const email = student[3];
      const platinum = student[4];

      //validate row
      if (
        firstName.length < 3 ||
        lastName.length < 3 ||
        +departmentId < 0 ||
        !email.includes("@") ||
        !(platinum === "1" || platinum === "0")
      ) {
        console.error(`invalid data in row ${i + 1} ${firstName} ${lastName}`);
        return;
      }

      graduateMutation.mutate({
        firstName,
        lastName,
        departmentId,
        email,
        platinum,
      });
    });
  }

  function addFacultys(data) {
    data.forEach((faculty, i) => {
      const firstName = faculty[0];
      const lastName = faculty[1];
      const departmentId = faculty[2];
      const email = faculty[3];

      //validate row
      if (
        firstName.length < 3 ||
        lastName.length < 3 ||
        +departmentId < 0 ||
        !email.includes("@")
      ) {
        console.error(`invalid data in row ${i + 1} ${firstName} ${lastName}`);
        return;
      }

      facultyMutation.mutate({
        firstName: faculty[0],
        lastName: faculty[1],
        departmentId: faculty[2],
        email: faculty[3],
      });
    });
  }

  function formSubmitHandler(e) {
    e.preventDefault();

    let data;

    if (file) {
      fileReader.onload = function (e) {
        const contents = e.target.result;

        data = parseCsv(contents);

        if (data) {
          switch (props.type) {
            case "student":
              addGraduates(data);
              break;

            case "faculty":
              addFacultys(data);
              break;

            default:
              console.error("props.type is invalid");
              break;
          }
        }
      };

      fileReader.readAsText(file);
    }
  }

  return (
    <form action="" className={styles.importForm}>
      {showFormatter && (
        <Modal>
          <FormatGuide
            type={props.type}
            toggleShow={(show) => setShowFormatter(show)}
            onSelectFile={onSelectFile}
            file={file}
          />
        </Modal>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowFormatter(true);
        }}
        className={c(
          styles.file,
          file ? styles.fileSelected : styles.fileUnselected
        )}
      >
        Import File
      </button>
      <div className={styles.holder}>
        {file && <strong className={styles.fileName}>{file.name}</strong>}
        {
          <button
            type="submit"
            onClick={formSubmitHandler}
            disabled={!file}
            className={c(styles.importBtn, "coolBtn")}
          >
            Import
          </button>
        }
      </div>
    </form>
  );
}

export default ImportCSV;
