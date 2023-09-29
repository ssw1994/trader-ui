import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import styles from "../../../styles.module.css";
import api from "src/Services/api";
import { dayMap } from "src/Models";

interface MonthBoxProps extends CalenderDisplayProps {
  month: number;
  year: number;
  style?: any;
}

interface BoxProps extends CalenderDisplayProps {
  day: moment.Moment | null;
  weekDay?: string;
  statistics?: any;
}

export function Box(props: BoxProps) {
  const m = moment();
  const { day, weekDay, statistics, addTrade } = props;

  if (!day) {
    return <div className={`${styles.box} ${styles.emptyBox}`}></div>;
  }

  return (
    <div
      className={`${styles.box} ${
        day.day() == 0 || day.day() == 6 ? styles.disabled : ""
      } ${
        statistics != null
          ? statistics < 0
            ? styles.lossDay
            : styles.profitDay
          : styles.normalDay
      }`}
      title={`${statistics < 0 ? "Loss" : "Profit"} on ${day.format(
        "DD-MMM-YYYY"
      )} is ${statistics}`}
      onClick={() => addTrade(day)}
    >
      <div
        className={`${
          statistics != null ? styles.content : styles.contentOnly
        }`}
      >
        <div className={styles.front}>{day.date()}</div>
        <div className={styles.back}>
          <strong
            className={
              statistics != null
                ? statistics < 0
                  ? styles.negative
                  : styles.positive
                : styles.neutral
            }
          >
            {statistics}
          </strong>
        </div>
      </div>
    </div>
  );
}
export function MonthBox(props: MonthBoxProps) {
  const [calender, setCalender] = useState<
    Array<{ date: moment.Moment | null; amount: number } | null>
  >([]);
  const [week, setWeek] = useState<Array<string>>([]);
  const [monthProfitLoss, setMonthProfileLass] = useState<
    Array<{ _id: string; amount: number }>
  >([]);
  const { month, year, addTrade } = props;
  const m = moment();
  useEffect(() => {
    const date = moment().set("month", month).set("year", year).set("day", 1);
    const fetchMonthData = () => {
      api
        .fetchPnl({
          fromDate: date.startOf("month").format("YYYY-MM-DD").toString(),
          toDate: date.endOf("month").format("YYYY-MM-DD").toString(),
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setMonthProfileLass(response?.data ?? []);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchMonthData();
  }, [month, year]);

  useEffect(() => {
    const date = moment().set("month", month).set("year", year).set("day", 1);
    let currentMonthDates: Array<{
      date: moment.Moment | null;
      amount: number;
    } | null> = Array.from({ length: date.daysInMonth() }, (x, i) => {
      const datePnl: any = monthProfitLoss.find((item: any) =>
        moment(item._id).isSame(
          moment(date.toDate()).startOf("month").add(i, "days")
        )
      );
      return {
        date: moment(date.toDate()).startOf("month").add(i, "days"),
        amount: datePnl?.amount,
      };
    });
    let firstDay = currentMonthDates[0]?.date?.day();
    while (firstDay && firstDay > 0) {
      currentMonthDates.unshift(null);
      firstDay -= 1;
    }
    setCalender(currentMonthDates);
    const weekOptions = [];
    for (let i = 0; i < 7; i++) {
      const day = dayMap.get(i);
      //const day = dayMap.get(currentMonthDates[i].day());
      day && weekOptions.push(day);
    }
    setWeek(weekOptions);
  }, [monthProfitLoss]);

  return (
    <div>
      <fieldset className={styles.calender} style={props.style}>
        <legend>{m.set("month", month).format("MMMM")}</legend>
        <div className={`${styles.flexRow}`} style={{ marginBottom: "3px" }}>
          {week.map((wday) => {
            return <div className={`${styles.box}`}>{wday.toUpperCase()}</div>;
          })}
        </div>
        <div className={`${styles.flexRow}`}>
          {calender.map((day, index) => {
            return (
              <Box
                key={index}
                day={day?.date ?? null}
                addTrade={addTrade}
                statistics={day?.amount ?? null}
              ></Box>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

interface CalenderDisplayProps {
  addTrade: Function;
}

export default function YearWiseDisplay(props: CalenderDisplayProps) {
  const [years, setYears] = useState<Array<number>>([]);
  const [selectedYear, setSelectedYear] = useState<number>();
  const m = moment();
  const [months, setMonths] = useState<Array<string>>([]);
  useEffect(() => {
    const currentYear = m.year();
    setSelectedYear(currentYear);
    const yearOptions = [];
    for (let i = 0; i < 8; i++) {
      yearOptions.push(currentYear + i);
      yearOptions.push(currentYear - i);
    }
    yearOptions.sort();
    setYears(Array.from(new Set(yearOptions)));
    const monthOptions = [];
    for (let i = 0; i < 12; i++) {
      const m2 = m.clone();
      m2.set("month", i);
      monthOptions.push(m2.format("MMMM"));
    }
    console.log(monthOptions);
    setMonths(monthOptions);
  }, []);

  const onYearSelect = (year: any) => {
    setSelectedYear(year);
  };

  useEffect(() => {}, [selectedYear]);

  return (
    <div>
      <div>
        <label>Select Year : </label>
        <select
          value={selectedYear}
          onChange={(e) => onYearSelect(e.target.value)}
        >
          {years.map((year) => {
            return (
              <option value={year} key={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
      <div className={`${styles.flexRow} ${styles.centerItems}`}>
        {selectedYear &&
          months.map((month, index) => {
            return (
              <div key={month} className={styles.halfWidth}>
                <MonthBox
                  month={index}
                  year={selectedYear}
                  addTrade={props.addTrade}
                ></MonthBox>
              </div>
            );
          })}
      </div>
    </div>
  );
}
