import React from "react";
import { NavLink, Outlet } from "react-router-dom";
export default function TradeLayout() {
  return (
    <div className="trade-layout">
      <div>
        <NavLink
          to="/trades/dashboard"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/trades/calender"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Trade Calender
        </NavLink>
        <NavLink
          to="/trades/trade-list"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Trade List
        </NavLink>
        <NavLink
          to="/documents"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Documents
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
