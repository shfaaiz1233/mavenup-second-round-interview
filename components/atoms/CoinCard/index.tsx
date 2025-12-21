import { useAppTheme } from "@/theme";
import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import ImageAvatar from "../ImageAvatar";
import LineChartComponent from "../LineChart";
import styles from "./styles";
import type { CoinCardProps } from "./types";
// ABC
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
          <Text style={styles.symbolText}>{cryptoAsset.symbol}</Text>
          <Text style={styles.nameText}>{cryptoAsset.name}</Text>
        </View>
      </View>
      <View style={styles.chartWrapper}>
        <LineChartComponent
          cryptoAsset={cryptoAsset}
          style={{ width: "80%" }}
        />
      </View>
      <View style={styles.bottomContent}>
        <Text
          style={[styles.priceText, {}]}
        >{`$ ${cryptoAsset.currentPrice}`}</Text>
        <View style={styles.percentageBadge}>
          <Text
            style={[
              {
                color:
                  cryptoAsset.priceChangePercentage24h < 0
                    ? colors.error
                    : colors.primary,
              },
              styles.percentageText,
            ]}
          >{`${cryptoAsset.priceChangePercentage24h} %`}</Text>
        </View>
      </View>
    </Pressable>
  );
});

export default CoinCardVerical;
