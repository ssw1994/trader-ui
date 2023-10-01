import React, { useState } from "react";
import styles from "../../../styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import api from "src/Services/api";
export default function Register() {
  const navigate = useNavigate();
  const [userRegistrationForm, updateRegistrationForm] = useState({
    username: "",
    password: "",
    repassword: "",
    mobile: "",
  });

  const updateForm = (e: any) => {
    const { value, name } = e.target;
    updateRegistrationForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const doRegistration = (event: any) => {
    console.log(event);
    event.preventDefault();
    const payload = { ...userRegistrationForm };

    api
      .doRegistration(payload)
      .then((response) => {
        if (response.status === 200) {
          navigate("/trades/dashboard");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
          <input
            placeholder="Username"
            required={true}
            value={userRegistrationForm.username}
            name="username"
            onChange={updateForm}
          />
        </div>
        <div className={`${styles.formControl} ${styles.reverseTheme}`}>
          <input
            placeholder="Mobile"
            required={true}
            value={userRegistrationForm.mobile}
            name="mobile"
            onChange={updateForm}
          />
        </div>
        <div className={`${styles.formControl} ${styles.reverseTheme}`}>
          <input
            placeholder="Password"
            required={true}
            value={userRegistrationForm.password}
            name="password"
            onChange={updateForm}
          />
        </div>
        <div className={`${styles.formControl} ${styles.reverseTheme}`}>
          <input
            placeholder="Confirm Password"
            required={true}
            value={userRegistrationForm.repassword}
            name="repassword"
            onChange={updateForm}
          />
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
