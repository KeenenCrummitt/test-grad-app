import React, { useState } from "react";

import Modal from "./Modal";

import styles from "./PurgeTable.module.css";

function PurgeTable(props) {
  const [showConfirm, setShowConfirm] = useState(false);
  function clickClearHandler() {
    setShowConfirm(true);
  }

  function clearHandler() {
    props.onClickClear();

    setShowConfirm(false);
  }

  function cancelHandler() {
    setShowConfirm(false);
  }

  return (
    <React.Fragment>
      {!showConfirm && (
        <div className={styles.btnHolder}>
          <button onClick={clickClearHandler} className="coolBtn">
            Clear table data
          </button>
        </div>
      )}
      {showConfirm && (
        <Modal>
          <h3 className={styles.confirmHead}>
            Are you sure you want to delete all data in this table?
          </h3>
          <div className={styles.btns}>
            <button onClick={clearHandler} className="coolBtn">
              Yes
            </button>
            <button onClick={cancelHandler} className="coolBtn">
              No
            </button>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default PurgeTable;
