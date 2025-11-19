import { useAppTheme } from "@/theme";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { CoinCardProps } from "../CoinCard/types";
import ImageAvatar from "../ImageAvatar";
import LineChartComponent from "../LineChart";
import styles from "./styles";
const CoinCardVerical = React.memo(function CoinCard({
  cryptoAsset,
  onPress,
}: CoinCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={[styles.card, { backgroundColor: colors.surface }]}
    >
      <View style={styles.imageAndTitleAbsolute}>
        <ImageAvatar imageUri={cryptoAsset.image} />
        <View>
          <Text style={[styles.symbolText, { color: colors.onSurface }]}>
            {cryptoAsset.symbol}
          </Text>
          <Text style={[styles.nameText, { color: colors.onSurface }]}>
            {cryptoAsset.name}
          </Text>
        </View>
        <View style={styles.percentageContainer}>
          <Text
            style={[
              styles.percentageText,
              {
                color:
                  cryptoAsset.priceChangePercentage24h < 0
                    ? colors.error
                    : colors.primary,
              },
            ]}
          >
            {`${cryptoAsset.priceChangePercentage24h} %`}
          </Text>
        </View>
      </View>

      <View style={styles.chartContainerAbsolute}>
        <LineChartComponent
          cryptoAsset={cryptoAsset}
          style={{ width: "80%" }}
        />
      </View>

      <Text style={[styles.priceTextAbsolute, { color: colors.onSurface }]}>
        {`$ ${cryptoAsset.currentPrice}`}
      </Text>
    </Pressable>
  );
});

export default CoinCardVerical;
