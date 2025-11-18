import type { CryptoAsset } from "@/components/molecules/currenciesList/types";
import { useAppTheme } from "@/theme";
import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { LineChart } from "react-native-wagmi-charts";

const LineChartComponent = React.memo(function LineChartComponent({
  cryptoAsset,
  style,
  interactive = false,
}: {
  cryptoAsset: CryptoAsset;
  style?: StyleProp<ViewStyle>;
  interactive?: boolean;
}) {
  const { colors } = useAppTheme();
  return (
    <View style={{ height: 'auto', width: "100%" }}>
      <LineChart.Provider
        data={cryptoAsset.sparkline.map((sp, i) => ({
          value: sp,
          timestamp: i,
        }))}
        yRange={{
          min: Math.min(...cryptoAsset.sparkline),
          max: Math.max(...cryptoAsset.sparkline),
        }}
      >
        <LineChart
          yGutter={150}
          style={[
            style,
            {
              overflow: "scroll",
            },
          ]}
        >
          <LineChart.Path
            width={2}
            color={
              cryptoAsset.priceChangePercentage24h < 0
                ? colors.error
                : colors.primary
            }
          />
          {interactive && (
            <LineChart.CursorCrosshair color="#FFFFFF">
              <LineChart.Tooltip
                textStyle={{
                  color: "#FFFFFF",
                }}
              />
            </LineChart.CursorCrosshair>
          )}
        </LineChart>
      </LineChart.Provider>
    </View>
  );
});

export default LineChartComponent;
