import React, { useContext, useState } from "react";

import { NavLink } from "react-router-dom";
import LoginContext from "../../store/login-context";
import Logout from "../Management/Login/Logout";
import LoginForm from "../Management/Login/LoginForm";

import styles from "./Header.module.css";
import { c } from "../../functions/utils";
import HeaderLinks from "./HeaderLinks";

function Header(props) {
  const [showMenu, setShowMenu] = useState(false);

  const loginCtx = useContext(LoginContext);

  let loginJSX = <LoginForm />;

  if (loginCtx.loggedIn) {
    loginJSX = <Logout />;
  }

  function clickMenuHandler() {
    setShowMenu((prev) => !prev);
  }

  return (
    <React.Fragment>
      <header className={styles.header}>
        {props.children}
        <nav>
          <NavLink to="/">
            <img
              className={c(styles.logo)}
              src="/btechlogo.png"
              alt="BTech logo"
            />
          </NavLink>

          <div
            className={c(showMenu ? styles.headerLinks : styles.responsiveHide)}
          >
            <HeaderLinks toggleShowMenu={clickMenuHandler} />
          </div>

          {loginJSX}

          <button className={styles.menu} onClick={clickMenuHandler}></button>
        </nav>
      </header>
    </React.Fragment>
  );
}

export default Header;
