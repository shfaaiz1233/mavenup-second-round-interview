import ThemedSegmentedButtons from "@/components/atoms/ThemedSegmentedButtons";
import { ValueWithFeather } from "@/components/atoms/ThemedSegmentedButtons/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { CryptoAsset } from "./types";
const CurrenciesList = () => {
    
  const COINS_LIST_URL =
    "https://coingeko.burjx.com/coin-prices-all?currency=usd";
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
    const endpoint = `${COINS_LIST_URL}&page=${page}pageSize=${pageSize}`;
    try {
      const response = await axios.get(endpoint);
      const data = response.data as CryptoAsset[]
      console.log("Response", data);
    } catch (err) {
      console.log("Error", err);
    } finally {
    }
  };
  useEffect(() => {
    fetchCoinData()
  }, [])
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
