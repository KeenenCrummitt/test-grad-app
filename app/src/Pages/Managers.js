import React from "react";
import PageTitle from "../componenets/Layout/PageTitle";
import Redirect from "../componenets/Management/Login/Redirect";
import AddManagerForm from "../componenets/Management/Managers/AddManagerForm";
import ManagerList from "../componenets/Management/Managers/ManagerList";

import styles from "./AddManager.module.css";

function Managers() {
  return (
    <React.Fragment>
      <Redirect admin={true} />

      <PageTitle title="Management" />
      <AddManagerForm />
      <ManagerList />
    </React.Fragment>
  );
}

export default Managers;
