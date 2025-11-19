import RadialBackground from "@/components/atoms/RadialBackground";
import { useAppTheme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { ActivityIndicator, Avatar, Text } from "react-native-paper";
import { CandlestickChart } from "react-native-wagmi-charts";
import type { CryptoAsset } from "../currenciesList/types";
import styles from "./styles";
import { timeframeDaysMap, timeframes, type OHLC_TYPE } from "./types";
const CurrencyDetails = () => {
  const { colors } = useAppTheme();
  const { id, data } = useLocalSearchParams();
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframes[0]);
  const [ohlcData, setOhlcData] = useState<OHLC_TYPE[]>([]);
  const cryptoData: CryptoAsset = JSON.parse(data as string);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const fetchCoinData = async (productId: string, days: number) => {
    if (!id) return;
    setLoadingData(true);
    try {
      const response = await axios.get("https://coingeko.burjx.com/coin-ohlc", {
        params: {
          productId,
          days,
        },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Connection: "keep-alive",
          TE: "trailers",
          "Upgrade-Insecure-Requests": "1",
        },
      });

      const data = response.data as OHLC_TYPE[];
      setOhlcData(data);
    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoadingData(false);
    }
  };
  useEffect(() => {
    fetchCoinData(id as string, timeframeDaysMap[selectedTimeframe]);
  }, [id, selectedTimeframe]);
  return (
    <View>
      <RadialBackground />

      <View style={{ minHeight: 600 }}>
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Pressable
              style={{
                width: 48,
                height: 48,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.surface,
                borderRadius: 100,
                alignSelf: "flex-start",
              }}
              onPress={router.back}
            >
              <Feather name="arrow-left" color={colors.onSurface} />
            </Pressable>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Avatar.Image source={{ uri: cryptoData.image }} size={24} />
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "500",
                  fontSize: 16,
                  lineHeight: 24,
                }}
              >{`${cryptoData.name} (${cryptoData.symbol})`}</Text>
            </View>
            <View />
          </View>
          <View>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 32,
                lineHeight: 48,
                marginVertical: 20,
              }}
            >{`$ ${cryptoData.currentPrice}`}</Text>
            <View style={styles.percentageBadge}>
              <Text
                style={[
                  {
                    color:
                      cryptoData.priceChangePercentage24h < 0
                        ? colors.error
                        : colors.primary,
                  },
                  styles.percentageText,
                ]}
              >{`${cryptoData.priceChangePercentage24h} %`}</Text>
            </View>
          </View>
          {loadingData ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                minHeight: 300
              }}
            >
              <ActivityIndicator />
            </View>
          ) : (
            <CandlestickChart.Provider
              data={ohlcData.map((data) => ({
                timestamp: data.date,
                high: data.usd.high,
                low: data.usd.low,
                open: data.usd.open,
                close: data.usd.close,
              }))}
            >
              <CandlestickChart width={500} height={500}>
                <CandlestickChart.Candles
                  positiveColor={colors.primary}
                  negativeColor={colors.error}
                />
                <CandlestickChart.Crosshair color={colors.primary}>
                  <CandlestickChart.Tooltip
                    textStyle={{
                      color: colors.onPrimary,
                    }}
                    xGutter={0}
                    yGutter={0}
                  />
                </CandlestickChart.Crosshair>
              </CandlestickChart>
            </CandlestickChart.Provider>
          )}
          <View style={styles.timeframeContainer}>
            {timeframes.map((label) => {
              const isSelected = selectedTimeframe === label;
              return (
                <Pressable
                  key={label}
                  onPress={() => setSelectedTimeframe(label)}
                  style={[
                    styles.timeframeButton,
                    isSelected && { backgroundColor: colors.primary },
                  ]}
                >
                  <Text
                    style={[
                      styles.timeframeText,
                      {
                        color: isSelected
                          ? colors.onPrimary
                          : colors.onBackground,
                      },
                    ]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CurrencyDetails;
