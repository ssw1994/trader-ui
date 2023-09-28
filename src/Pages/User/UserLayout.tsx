import React from "react";
import { Outlet } from "react-router-dom";
import styles from "../../styles.module.css";
export default function UserLayout() {
  return (
    <div className={`${styles.h100} ${styles.centerItems}`}>
      <Outlet />
    </div>
  );
}
