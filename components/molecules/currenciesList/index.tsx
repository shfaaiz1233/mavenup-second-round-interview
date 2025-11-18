import CoinCard from "@/components/atoms/CoinCard";
import CoinCardVerical from "@/components/atoms/CoinCardVertical";
import ThemedSegmentedButtons from "@/components/atoms/ThemedSegmentedButtons";
import { ValueWithFeather } from "@/components/atoms/ThemedSegmentedButtons/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import styles from "./styles";
import { CryptoAsset, type CoinsListApiResponse } from "./types";
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
  const allCointTab: ValueWithFeather[] = [
    {
      value: "allCoins",
      label: "All Coins",
    },
  ];
  const [allCoins, setAllCoins] = useState(allCointTab[0].value);
  const [coinsList, setCoinsList] = useState<CryptoAsset[]>([]);
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const [filteredCoinsList, setFilteredCoinsList] = useState<CryptoAsset[]>([]);
  const [filteredAllCoinsList, setFilteredAllCoinsList] = useState<
    CryptoAsset[]
  >([]);
  const fetchCoinData = async (page = 1, pageSize = 20) => {
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

      const data = response.data as CoinsListApiResponse;
      setCoinsList(data.data);
    } catch (err) {
      console.log("Error", err);
    } finally {
    }
  };
  useEffect(() => {
    fetchCoinData();
  }, []);

  useEffect(() => {
    const filterCoinsList = (coins: CryptoAsset[]) => {
      let filtered = [...coins];

      switch (selectedTab) {
        case "featured":
          filtered = filtered
            .sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0))
            .slice(0, 20);
          break;
        case "topGainers":
          filtered = filtered
            .sort(
              (a, b) =>
                (b.priceChangePercentage24h || 0) -
                (a.priceChangePercentage24h || 0)
            )
            .slice(0, 20);
          break;
        case "topLosers":
          filtered = filtered
            .sort(
              (a, b) =>
                (a.priceChangePercentage24h || 0) -
                (b.priceChangePercentage24h || 0)
            )
            .slice(0, 20);
          break;
        default:
          filtered = coins;
      }

      return filtered;
    };

    setFilteredCoinsList(filterCoinsList(coinsList));
  }, [coinsList, selectedTab]);
  useEffect(() => {
    setFilteredAllCoinsList(coinsList);
  }, [coinsList]);
  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, gap: 20 }}>
        <ThemedSegmentedButtons
          values={tabs}
          selectedValue={selectedTab}
          setSelectedValue={setSelectedTab}
        />
        <FlatList
          horizontal
          data={filteredCoinsList}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
          renderItem={({ item }) => <CoinCard cryptoAsset={item} width={320} />}
        />
        <ThemedSegmentedButtons
          values={allCointTab}
          selectedValue={allCoins}
          setSelectedValue={setAllCoins}
        />
        {coinsList.length && <CoinCardVerical cryptoAsset={coinsList[0]} />}
      </View>
    </ScrollView>
  );
};

export default CurrenciesList;
