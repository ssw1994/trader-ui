import styles from "../../../styles.module.css";
import moment from "moment";
import { MonthBox } from "./YearWiseDisplay";
import { useState } from "react";
interface CalenderDisplayProps {
  addTrade: Function;
}
export default function MonthWiseDisplay(props: CalenderDisplayProps) {
  const [currentMonth, updateCurrentMonth] = useState<moment.Moment>(moment());
  const previousMonth = () => {
    updateCurrentMonth((current) => {
      const nextMonth = moment(current.subtract(1, "month"));
      return nextMonth;
    });
  };

  const nextMonth = () => {
    updateCurrentMonth((current) => {
      const nextMonth = moment(current.add(1, "month"));
      return nextMonth;
    });
  };

  return (
    <div className={`${styles.flexColumn}`}>
      <div>
        <button onClick={() => previousMonth()}>Previous Month</button>
        &nbsp;&nbsp;
        <label>{currentMonth.format("MMM-YYYY")}</label>
        &nbsp;&nbsp;
        <button onClick={() => nextMonth()}>Next Month</button>
      </div>
      <div className={`${styles.flexRow} ${styles.centerItems}`}>
        <MonthBox
          month={currentMonth.get("month")}
          year={currentMonth.get("year")}
          addTrade={props.addTrade}
        ></MonthBox>
      </div>
    </div>
  );
}
