export interface OHLC {
  open: number;
  high: number;
  low: number;
  close: number;
}
export interface OHLC_TYPE {
  date: number;
  usd: OHLC;
  aed: OHLC;
}
