import React from "react";
import styles from "../../../styles.module.css";
import { Link } from "react-router-dom";
export default function Register() {
  const doRegistration = (event: any) => {
    console.log(event);
    event.preventDefault();
  };
  return (
    <div
      style={{ width: "350px", height: "450px", borderRadius: "15px" }}
      className={`${styles.card} ${styles.reverseTheme}`}
    >
      <form
        onSubmit={(event) => doRegistration(event)}
        className={`${styles.flexColumn} ${styles.centerItems} ${styles.reverseTheme}`}
      >
        <div>
          <label>Register here</label>
        </div>
        <div className={`${styles.formControl} ${styles.reverseTheme}`}>
          <input placeholder="Username" required={true} />
        </div>
        <div className={`${styles.formControl} ${styles.reverseTheme}`}>
          <input placeholder="Mobile" required={true} />
        </div>
        <div className={`${styles.formControl} ${styles.reverseTheme}`}>
          <input placeholder="Password" required={true} />
        </div>
        <div className={`${styles.formControl} ${styles.reverseTheme}`}>
          <input placeholder="Confirm Password" required={true} />
        </div>
        <div>
          <button>Register</button>
        </div>
        <div>
          <label>
            Already have account ? <br />
            <Link to="/">Login here</Link>
          </label>
        </div>
      </form>
      <div></div>
    </div>
  );
}
