import React, { useEffect, useState } from "react";
import { ArcElement, Tooltip, Legend, CategoryScale } from "chart.js";
import api, { DateRange } from "src/Services/api";
import { PeriodOption, dayMap, monthMap } from "../../Models";
import { currentMonth, years } from "src/Utils";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import styles from "../../styles.module.css";
Chart.register(ArcElement, Tooltip, Legend, CategoryScale);

interface ReportsProps {
  period: PeriodOption;
}

interface HistogramProps extends ReportsProps {}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Proft/Loss Statement",
    },
  },
};

export function Histogram(props: HistogramProps) {
  const [chartData, setChartData] = useState<any>(null);
  const { period } = props;
  const periodOptions = {
    week: Array.from(dayMap).map(([i, j]) => j),
    weeks: [],
    month: currentMonth.map((item: moment.Moment) =>
      item.format("DD-MMM-YYYY")
    ),
    years: years,
    year: Array.from(monthMap).map(([k, v]) => v),
  };
  console.log(periodOptions);
  useEffect(() => {
    const payload: DateRange = {};
    if (period === "Month") {
      payload["currentMonth"] = true;
    } else if (period === "Week") {
      payload["currentWeek"] = true;
    } else if (period === "Year") {
      payload["currentYear"] = true;
    }
    api
      .fetchPnl(payload)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const responesData = response?.data ?? [];
          const statistics: { profits: Array<any>; losses: Array<any> } = {
            profits: responesData.map((item: any) => {
              if (item.amount > 0) return item.amount;
              return 0;
            }),
            losses: responesData.map((item: any) => {
              if (item.amount < 0) return Math.abs(item.amount);
              return 0;
            }),
          };

          const getLabels = (item: any) => {
            if (payload.currentMonth) {
              return moment(item._id).format("DD-MMM-YYYY");
            } else if (payload.currentYear) {
              return monthMap.get(item._id);
            } else {
              return dayMap.get(moment(item._id).get("day"));
            }
          };
          const data = {
            labels: responesData.map(getLabels),
            datasets: [
              {
                label: "Profit",
                data: statistics.profits,
                backgroundColor: "lightgreen",
              },
              {
                label: "Loss",
                data: statistics.losses,
                backgroundColor: "lightred",
              },
            ],
          };
          console.log(data);
          setChartData(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [period]);

  return (
    <div>
      {chartData ? (
        <Bar options={options} data={chartData} height={400} width={500} />
      ) : null}
    </div>
  );
}

export default function Reports(props: ReportsProps) {
  return (
    <div>
      <div>
        <Histogram period={props.period} />
      </div>
    </div>
  );
}
