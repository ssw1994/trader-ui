import { createBrowserRouter } from "react-router-dom";
import Login from "./User/Login/Login";
import Register from "./User/Register/Register";
import UserLayout from "./User/UserLayout";
import TradeLayout from "./Trades/TradeLayout";
import Calender from "./Trades/Calender/Calender";
import Trades from "./Trades/Trades/Trades";
import Dashboard from "./Dashboard/Dashboard/Dashboard";
import Document from "./Documents/Document";
export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "trades",
    element: <TradeLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "calender",
        element: <Calender />,
      },
      {
        path: "trade-list",
        element: <Trades />,
      },
    ],
  },
  {
    path: "documents",
    element: <Document />,
  },
]);
