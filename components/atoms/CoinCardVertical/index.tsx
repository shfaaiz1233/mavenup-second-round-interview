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
      <View style={{ width: '100%', padding: 20, flexDirection: "row", justifyContent: "space-between", position: 'absolute' }}>
        <View style={styles.imageAndTitle}>
          <ImageAvatar imageUri={cryptoAsset.image} />
          <View>
            <Text style={styles.symbolText}>{cryptoAsset.symbol}</Text>
            <Text style={styles.nameText}>{cryptoAsset.name}</Text>
          </View>
        </View>
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "400",
            fontSize: 16,
            lineHeight: 24,
            width: "20%",
          }}
        >{`$ ${cryptoAsset.currentPrice}`}</Text>
        <LineChartComponent
          cryptoAsset={cryptoAsset}
          style={{ width: "80%" }}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderColor: "#FFFFFF0D",
    padding: 20,
    height: "auto",
    borderWidth: 1,
  },
  imageAndTitle: {
    flexDirection: "row",
    gap: 12,
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
