import React from "react";
import PageTitle from "../componenets/Layout/PageTitle";

import styles from "./FourOhFour.module.css";

function FourOhFour() {
  return (
    <React.Fragment>
      <PageTitle title="404" />
      <div>
        <p>404! can't find page</p>
      </div>
    </React.Fragment>
  );
}

export default FourOhFour;
