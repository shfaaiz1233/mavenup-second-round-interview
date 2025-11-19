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

export const timeframes = ['24H', '1W', '1M', '3M', '1Y'];

export const timeframeDaysMap: Record<string, number> = {
  '24H': 1,
  '1W': 7,
  '1M': 30,
  '3M': 90,
  '1Y': 365,
  ALL: Infinity,
};
