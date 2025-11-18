import type { CryptoAsset } from "@/components/molecules/currenciesList/types";
import { useAppTheme } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import ImageAvatar from "../ImageAvatar";
import LineChartComponent from "../LineChart";

const CoinCardVerical = React.memo(function CoinCard({
  cryptoAsset,
}: {
  cryptoAsset: CryptoAsset;
}) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={[styles.imageAndTitleAbsolute]}>
        <ImageAvatar imageUri={cryptoAsset.image} />
        <View>
          <Text style={styles.symbolText}>{cryptoAsset.symbol}</Text>
          <Text style={styles.nameText}>{cryptoAsset.name}</Text>
        </View>
        <View
          style={{
            backgroundColor: "#FFFFFF0D",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 7,
            padding: 4,
            marginLeft: "auto",
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
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          top: 0,
          right: 0,
        }}
      >
        <LineChartComponent
          cryptoAsset={cryptoAsset}
          style={{ width: "80%" }}
        />
      </View>
      <Text
        style={[
          styles.priceText,
          { position: "absolute", bottom: 3, left: 14, padding: 4 },
        ]}
      >{`$ ${cryptoAsset.currentPrice}`}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderColor: "#FFFFFF0D",
    padding: 20,
    borderWidth: 1,
    height: 250,
    overflow: "hidden", // important: clips chart bottom
    position: "relative",
  },
  imageAndTitleAbsolute: {
    position: "absolute",
    top: 15,
    left: 15,
    flexDirection: "row",
    gap: 12,
    zIndex: 10,
    width: "100%",
  },

  headerContainer: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    left: 0,
  },

  imageAndTitle: {
    flexDirection: "row",
    gap: 12,
  },

  percentageContainer: {
    backgroundColor: "#FFFFFF0D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    padding: 4,
  },

  percentageText: {
    fontSize: 10,
    fontWeight: "400",
  },

  bottomContent: {
    marginTop: 60, // space for absolute header
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chartWrapper: {
    width: "80%",
  },

  priceText: {
    fontWeight: "400",
    fontSize: 16,
    width: "20%",
    lineHeight: 24,
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

export default CoinCardVerical;
