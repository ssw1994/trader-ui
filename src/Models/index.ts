export enum TradeType {
  buy = "BUY",
  sell = "SELL",
}

export enum TradeOption {
  put = "PUT",
  call = "CALL",
}

export enum TradeIndex {
  nifty = "NIFTY",
  bankNifty = "BANKNIFTY",
  finnifty = "FINNIFTY",
}

export interface Trade {
  strikePrice: number;
  trade: TradeType;
  option: TradeOption;
  transactionPrice: number;
  index: TradeIndex;
  slots: number;
  comments: string;
  date: string;
}

export class TradeEntity implements Trade {
  strikePrice: number;
  trade: TradeType;
  index: TradeIndex;
  slots: number;
  date: string;
  option: TradeOption;
  comments: string;
  transactionPrice: number;
  constructor(date: string) {
    this.strikePrice = 0;
    this.trade = TradeType.buy;
    this.index = TradeIndex.nifty;
    this.slots = 0;
    this.date = date;
    this.option = TradeOption.call;
    this.comments = "";
    this.transactionPrice = 0;
  }
}

export const dayMap = new Map([
  [0, "Sun"],
  [1, "Mon"],
  [2, "Tue"],
  [3, "Wed"],
  [4, "Thur"],
  [5, "Fri"],
  [6, "Sat"],
]);

export const monthMap = new Map([
  [1, "Jan"],
  [2, "Feb"],
  [3, "Mar"],
  [4, "Apr"],
  [5, "May"],
  [6, "Jun"],
  [7, "Jul"],
  [8, "Aug"],
  [9, "Sept"],
  [10, "Oct"],
  [11, "Nov"],
  [12, "Dec"],
]);

export type PeriodOption = "Month" | "Year" | "Weeks" | "Week";
