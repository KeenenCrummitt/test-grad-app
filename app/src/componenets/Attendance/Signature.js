import { c } from "../../functions/utils";
import styles from "./Signature.module.css";

function Signature(props) {
  return (
    <div className={styles.container}>
      <p className={c(styles.terms)}>
        By checking this box I accept the fact that I am not quite as cool as
        Keenen
      </p>
      <div className={c("input")}>
        <label htmlFor="signature">Signature</label>
        <input
          id="signature"
          type="checkbox"
          checked={props.signed}
          onChange={props.onSignedChanged}
        />
      </div>
      {props.person && props.signed && (
        <p
          className={c([styles.signature])}
        >{`${props.person.firstName} ${props.person.lastName}`}</p>
      )}
    </div>
  );
}

export default Signature;
