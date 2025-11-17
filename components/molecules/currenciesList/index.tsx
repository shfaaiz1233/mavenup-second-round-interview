import ThemedSegmentedButtons from "@/components/atoms/ThemedSegmentedButtons";
import { ValueWithFeather } from "@/components/atoms/ThemedSegmentedButtons/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { CryptoAsset } from "./types";
const CurrenciesList = () => {
  const tabs: ValueWithFeather[] = [
    {
      value: "featured",
      label: "⭐ Featured",
    },
    {
      value: "topGainers",
      label: "🚀 Top Gainers",
    },
    {
      value: "topLosers",
      label: "🔻Top Losers",
    },
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const fetchCoinData = async (page = 1, pageSize = 10) => {
    try {
      const response = await axios.get(
        "https://coingeko.burjx.com/coin-prices-all",
        {
          params: {
            currency: "usd",
            page,
            pageSize,
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
        }
      );

      const data = response.data as {data: CryptoAsset[]}
      console.log('Data', data.data.length ? data.data[0] : data.data)
    } catch (err) {
      console.log("Error", err);
    } finally {
    }
  };
  useEffect(() => {
    fetchCoinData();
  }, []);
  return (
    <View style={styles.container}>
      <ThemedSegmentedButtons
        values={tabs}
        selectedValue={selectedTab}
        setSelectedValue={setSelectedTab}
      />
    </View>
  );
};

export default CurrenciesList;
