import moment from "moment";

export const years: Array<number> = (() => {
  const currentYear = moment().get("year");
  const options: Array<number> = [currentYear];
  for (let i = 0; i < 5; i++) {
    options.push(currentYear + i);
    options.push(currentYear - i);
  }
  return options;
})();

export const currentMonth: Array<moment.Moment> = (() => {
  const date = moment();
  const currentMonth: Array<moment.Moment> = Array.from(
    { length: date.daysInMonth() },
    (x, i) => moment(date.toDate()).startOf("month").add(i, "days")
  );
  return currentMonth;
})();
