import type { CryptoAsset } from "@/components/molecules/currenciesList/types";

export type CoinCardProps = {
  cryptoAsset: CryptoAsset;
  onPress?: () => void;
};
