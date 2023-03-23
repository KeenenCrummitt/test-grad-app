import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { c } from "../../functions/utils";
import LoginContext from "../../store/login-context";

import styles from "./HeaderLinks.module.css";

function HeaderLinks(props) {
  const loginCtx = useContext(LoginContext);

  function linkClickHandeler() {
    props.toggleShowMenu();
  }

  return (
    <ul className={c(styles.links)}>
      <li className={c(styles.listItem)}>
        <NavLink
          onClick={linkClickHandeler}
          className={c(styles.link)}
          to="/check-in"
        >
          Check&nbsp;In
        </NavLink>
      </li>
      {loginCtx.loggedIn && (
        <li className={c(styles.listItem)}>
          <NavLink
            onClick={linkClickHandeler}
            className={c(styles.link)}
            to="/attendees"
          >
            Attendees
          </NavLink>
        </li>
      )}
      {loginCtx.loggedIn && loginCtx.admin && (
        <li className={c(styles.listItem)}>
          <NavLink
            onClick={linkClickHandeler}
            className={c(styles.link)}
            to="/managers"
          >
            Management
          </NavLink>
        </li>
      )}
      {loginCtx.loggedIn && (
        <li className={c(styles.listItem)}>
          <NavLink
            onClick={linkClickHandeler}
            className={c(styles.link)}
            to="/departments"
          >
            Add Department
          </NavLink>
        </li>
      )}
      <li className={c(styles.listItem)}>
        <NavLink
          onClick={linkClickHandeler}
          className={c(styles.link)}
          to="/there"
        >
          Attending&nbsp;Graduate&nbsp;List
        </NavLink>
      </li>
    </ul>
  );
}

export default HeaderLinks;
