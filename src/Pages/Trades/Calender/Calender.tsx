import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import styles from "../../../styles.module.css";
import api, { Trade } from "src/Services/api";
import YearWiseDisplay from "./YearWiseDisplay";
import MonthWiseDisplay from "./MonthWiseDisplay";
import AddTrade from "../AddTrade/AddTrade";

enum DisplayType {
  year = 1,
  month = 2,
}

export default function Calender() {
  const [selectedView, setSelectedView] = React.useState(DisplayType.month);

  const [addTradeEnabled, setAddTradeEnabled] = useState<boolean>(false);

  const viewOptions = [
    {
      id: DisplayType.year,
      displayName: "Year",
    },
    {
      id: DisplayType.month,
      displayName: "Month",
    },
  ];

  const setView = (value: any) => {
    setSelectedView(value);
  };

  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);

  const addTrade = (date: moment.Moment) => {
    setAddTradeEnabled(true);
    setSelectedDate(date);
  };

  const closeAddTrade = () => {
    setAddTradeEnabled(false);
  };

  return (
    <div>
      <div className={styles.centerItems}>
        <label>View By : </label>
        <select
          id="View By"
          onChange={(e) => setView(e.target.value)}
          value={selectedView}
        >
          {viewOptions.map((option) => {
            return (
              <option value={option.id} key={option.id}>
                {option.displayName}
              </option>
            );
          })}
        </select>
      </div>
      <div style={{ width: addTradeEnabled ? "70vw" : "100vw" }}>
        {selectedView == DisplayType.year ? (
          <YearWiseDisplay addTrade={addTrade} />
        ) : (
          <MonthWiseDisplay addTrade={addTrade} />
        )}
      </div>

      {addTradeEnabled && (
        <AddTrade close={closeAddTrade} date={selectedDate} />
      )}
    </div>
  );
}
