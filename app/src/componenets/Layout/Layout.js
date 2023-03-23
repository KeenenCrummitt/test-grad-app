import React from "react";

import { c } from "../../functions/utils";

import styles from "./Layout.module.css";

function Layout(props) {
  return <div className={c([styles.wrapper])}> {props.children}</div>;
}

export default Layout;
