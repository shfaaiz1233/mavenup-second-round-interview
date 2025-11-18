export interface CryptoAsset {
  productId: number;
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  sparkline: number[];
  marketCap: number;
  tradingVolume: number;
  symbol: string;
}

export interface CoinsListApiResponse {
  data: CryptoAsset[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
