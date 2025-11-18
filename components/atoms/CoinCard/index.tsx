import type { CryptoAsset } from "@/components/molecules/currenciesList/types";
import { useAppTheme } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import ImageAvatar from "../ImageAvatar";
import LineChartComponent from "../LineChart";

const CoinCard = React.memo(function CoinCard({
  cryptoAsset,
  width,
}: {
  cryptoAsset: CryptoAsset;
  width?: number;
}) {
  const { colors } = useAppTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface },
        width ? { width } : {},
      ]}
    >
      <View style={[styles.imageAndTitleAbsolute]}>
        <ImageAvatar imageUri={cryptoAsset.image} />
        <View>
          <Text style={styles.symbolText}>{cryptoAsset.symbol}</Text>
          <Text style={styles.nameText}>{cryptoAsset.name}</Text>
        </View>
      </View>
      <LineChartComponent cryptoAsset={cryptoAsset} />
      <View style={styles.priceRowAbsolute}>
        <Text
          style={{ fontWeight: "400", fontSize: 16, lineHeight: 24 }}
        >{`$ ${cryptoAsset.currentPrice}`}</Text>
        <View
          style={{
            backgroundColor: "#FFFFFF0D",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 7,
            padding: 4,
          }}
        >
          <Text
            style={{
              color:
                cryptoAsset.priceChangePercentage24h < 0
                  ? colors.error
                  : colors.primary,
              fontSize: 10,
              fontWeight: 400,
            }}
          >{`${cryptoAsset.priceChangePercentage24h} %`}</Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
   card: {
    borderRadius: 24,
    borderColor: "#FFFFFF0D",
    padding: 20,
    borderWidth: 1,
    width: "70%",
    overflow: "hidden",
  },

  imageAndTitleAbsolute: {
    position: "absolute",
    top: 15,
    left: 15,
    flexDirection: "row",
    gap: 12,
    zIndex: 10,
  },

  priceRowAbsolute: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  symbolText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    textTransform: "capitalize",
  },
  nameText: {
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 18,
    textTransform: "capitalize",
  },
});

export default CoinCard;
