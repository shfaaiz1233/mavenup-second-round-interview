import { useAppTheme } from "@/theme";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { CandlestickChart } from "react-native-wagmi-charts";
import type { CryptoAsset } from "../currenciesList/types";
import type { OHLC_TYPE } from "./types";
const CurrencyDetails = () => {
  const { colors } = useAppTheme();
  const { id, data } = useLocalSearchParams();
  const [ohlcData, setOhlcData] = useState<OHLC_TYPE[]>([]);
  const cryptoData: CryptoAsset = JSON.parse(data as string)
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
    fetchCoinData(id as string, 30);
  }, [id]);
  useEffect(() => {
    console.log("Data", data);
    if(data){
      console.log('Parsed',JSON.parse(data as string))
      
    }
  }, [data]);
  if (loadingData) return <ActivityIndicator />;
  return (
    <View style={{ padding: 20 }}>
      <Text>{cryptoData.name}</Text>
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
    </View>
  );
};

export default CurrencyDetails;
