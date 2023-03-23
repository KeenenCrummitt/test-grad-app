import React from "react";
import PageTitle from "../componenets/Layout/PageTitle";
import AddDepartmentForm from "../componenets/Management/Departments/AddDepartmentForm";
import DepartmentList from "../componenets/Management/Departments/DepartmentList";
import Redirect from "../componenets/Management/Login/Redirect";

import styles from "./AddDepartment.module.css";

function AddDepartment() {
  return (
    <React.Fragment>
      <PageTitle title="Departments" />

      <Redirect admin={false} />

      <AddDepartmentForm />
      <DepartmentList />
    </React.Fragment>
  );
}

export default AddDepartment;
