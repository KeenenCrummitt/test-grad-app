import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

function Modal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className={styles.modal}>{props.children}</div>,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
}

export default Modal;
