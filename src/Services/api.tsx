import { useState } from "react";
import axios, { Axios, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import moment from "moment";
import { TradeEntity } from "src/Models";

const http: Axios = (() => {
  const axiosInstance = axios.create({
    baseURL: "https://trade-journal-app-two.vercel.app/api/",
    timeout: 2000,
  });

  axiosInstance.interceptors.request.use(
    (req: InternalAxiosRequestConfig<any>) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        req.headers.set("Authorization", `Bearer ${token}`);
      }
      return req;
    }
  );
  return axiosInstance;
})();

//interfaces
export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  password: string;
  mobile: string | number;
  premium?: boolean;
}

export type TradeType = "BUY" | "SELL";
export type IndexOption = "NIFTY" | "BANKNIFTY" | "FINNIFTY";
export type TradeOption = "CALL" | "PUT";

export interface Trade {
  strikePrice: number;
  trade: TradeType;
  option: TradeOption;
  transationPrice: number;
  index: IndexOption;
  slots: number;
  comments?: string;
  date: string;
  _id?: string;
}

export interface DateRange {
  currentMonth?: boolean;
  previousMonth?: boolean;
  currentWeek?: boolean;
  previousWeek?: boolean;
  currentYear?: boolean;
  previousYear?: boolean;
  fromDate?: moment.Moment | Date | string;
  toDate?: moment.Moment | Date | string;
  date?: moment.Moment | Date | string;
}
// interfaces
export default (() => {
  function doLogin(payload: LoginParams): Promise<AxiosResponse> {
    return http.post("auth/login", payload);
  }

  function doRegistration(payload: RegisterParams): Promise<AxiosResponse> {
    return http.put("auth/signIn", payload);
  }
  function buildQueryString(obj: any = null): string {
    if (!obj) return "";
    return `?${Object.entries(obj)
      .map(([key, value]: [string, any]) => {
        return `${key}=${value}`;
      })
      .join("&")}`;
  }
  function fetchTrades(filterOptions?: DateRange) {
    let url: string = "trade";
    if (filterOptions) {
      url += buildQueryString(filterOptions);
    }
    return http.get(url);
  }

  function addTrade(payload: TradeEntity) {
    return http.put("trade/add", payload);
  }

  function deleteTrade(id: string) {
    return http.delete("trades" + buildQueryString({ id }));
  }

  function updateTrade(id: string, payload: Trade) {
    return http.post("update-transaction" + buildQueryString({ id }), payload);
  }

  function fetchTradeSummary() {
    return http.get("trade/summary");
  }

  function savePnl(payload: { date: string; amount: number }) {
    return http.post("pnl/save", payload);
  }

  function fetchPnl(payload?: DateRange) {
    let url: string = "pnl/statement";
    if (payload) {
      url += buildQueryString(payload);
    }
    return http.get(url);
  }

  return {
    doLogin,
    doRegistration,
    fetchTrades,
    addTrade,
    updateTrade,
    deleteTrade,
    fetchTradeSummary,
    savePnl,
    fetchPnl,
  };
})();
