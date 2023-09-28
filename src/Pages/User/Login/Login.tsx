import React, { useEffect, useState } from "react";
import styles from "../../../styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import api, { LoginParams } from "src/Services/api";
export default function Login() {
  const navigate = useNavigate();
  const [loginForm, updateLoginForm] = useState<LoginParams>({
    username: "",
    password: "",
  });

  const doLogin = (event: any) => {
    console.log(event);
    event.preventDefault();
    api.doLogin(loginForm).then((response) => {
      console.log(response);
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data?._id);
        navigate("/trades/dashboard");
      }
    });
  };

  const updateForm = (event: any) => {
    const { name, value } = event.target;
    updateLoginForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div
      style={{ width: "350px", height: "350px", borderRadius: "15px" }}
      className={`${styles.card} ${styles.reverseTheme}`}
    >
      <form
        onSubmit={(event) => doLogin(event)}
        className={`${styles.flexColumn} ${styles.centerItems} ${styles.reverseTheme}`}
      >
        <div>
          <label>Login here</label>
        </div>
        <div className={`${styles.formControl} ${styles.reverseTheme}`}>
          <input
            placeholder="Username"
            required={true}
            value={loginForm.username}
            name="username"
            onChange={updateForm}
          />
        </div>
        <div className={`${styles.formControl} ${styles.reverseTheme}`}>
          <input
            placeholder="password"
            required={true}
            value={loginForm.password}
            name="password"
            onChange={updateForm}
          />
        </div>
        <div>
          <button>Login</button>
        </div>
        <div>
          <label>
            New to stock trader ? <br />
            <Link to="/register">Register here</Link>
          </label>
        </div>
      </form>
    </div>
  );
}
