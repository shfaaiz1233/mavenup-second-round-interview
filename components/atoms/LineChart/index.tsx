import { CryptoAsset } from "@/components/molecules/currenciesList/types";
import { useAppTheme } from "@/theme";
import { LineChart } from "react-native-wagmi-charts";

function LineChartComponent({ cryptoAsset }: { cryptoAsset: CryptoAsset }) {
  const { colors } = useAppTheme();
  return (
    <LineChart.Provider
      data={cryptoAsset.sparkline.map((sp) => ({
        value: sp,
        timestamp: 0,
      }))}
    >
      <LineChart>
        <LineChart.Path
          color={
            cryptoAsset.priceChangePercentage24h < 0
              ? colors.error
              : colors.primary
          }
        />
      </LineChart>
    </LineChart.Provider>
  );
}
export default LineChartComponent;
