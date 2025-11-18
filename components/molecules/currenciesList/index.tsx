import CoinCard from "@/components/atoms/CoinCard";
import CoinCardVerical from "@/components/atoms/CoinCardVertical";
import ThemedSegmentedButtons from "@/components/atoms/ThemedSegmentedButtons";
import { ValueWithFeather } from "@/components/atoms/ThemedSegmentedButtons/types";
import { useAppTheme } from "@/theme";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import styles from "./styles";
import { CryptoAsset, type CoinsListApiResponse } from "./types";

const CurrenciesList = () => {
  const { colors } = useAppTheme();
  const renderListFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={{ paddingVertical: 20, alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  };
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
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
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

  const fetchAllCoinsData = async (page = 1, pageSize = 10) => {
    console.log("I ran with page", page);
    if (isLoadingMore || !hasMorePages) return;

    try {
      setIsLoadingMore(true);
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

      if (page === 1) {
        setFilteredAllCoinsList(data.data);
      } else {
        setFilteredAllCoinsList((prevList) => [...prevList, ...data.data]);
      }

      setCurrentPage(page);
      setHasMorePages(page < data.totalPages);
    } catch (err) {
      console.log("Error fetching all coins:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMorePages) {
      fetchAllCoinsData(currentPage + 1, 10);
    }
  };
  useEffect(() => {
    fetchCoinData();
    fetchAllCoinsData(1, 10);
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
  return (
    <View style={styles.container}>
      <View style={{ gap: 20 }}>
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
          renderItem={({ item }) => <CoinCard cryptoAsset={item} />}
        />
      </View>
      <View style={{ gap: 20 }}>
        <ThemedSegmentedButtons
          values={allCointTab}
          selectedValue={allCoins}
          setSelectedValue={setAllCoins}
        />
        <View style={{ marginBottom: 20 }}>
          <FlatList
            data={filteredAllCoinsList}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
            renderItem={({ item }) => <CoinCardVerical cryptoAsset={item} />}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderListFooter}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        </View>
      </View>
    </View>
  );
};

export default CurrenciesList;
