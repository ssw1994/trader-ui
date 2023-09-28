import React, { useEffect, useState } from "react";
import api from "../../../Services/api";
import styles from "../../../styles.module.css";
import { PeriodOption, dayMap, monthMap } from "../../../Models";
import { years } from "../../../Utils";
import Reports, { Histogram } from "../Reports";

export default function Dashboard() {
  const options: Array<PeriodOption> = ["Month", "Year", "Week"];
  const [selectedPeriodOption, setSelectedPeriodOption] =
    useState<PeriodOption>("Month");
  return (
    <div
      className={`${styles.flexColumn} ${styles.w100} ${styles.centerItems}`}
    >
      <div>
        <select
          value={selectedPeriodOption}
          onChange={(e: any) => setSelectedPeriodOption(e.target.value)}
        >
          {options.map((periodOption) => {
            return (
              <option value={periodOption} key={periodOption}>
                {periodOption}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <Reports period={selectedPeriodOption} />
      </div>
    </div>
  );
}
