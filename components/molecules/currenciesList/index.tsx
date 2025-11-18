import CoinCard from "@/components/atoms/CoinCard";
import CoinCardVerical from "@/components/atoms/CoinCardVertical";
import ThemedSegmentedButtons from "@/components/atoms/ThemedSegmentedButtons";
import { ValueWithFeather } from "@/components/atoms/ThemedSegmentedButtons/types";
import { useAppTheme } from "@/theme";
import axios from "axios";
import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const router = useRouter();
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
  const [error, setError] = useState<string | null>(null);
  const [errorAllCoins, setErrorAllCoins] = useState<string | null>(null);
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
      setError(null);
    } catch (err) {
      console.log("Error", err);
      setError(
        (err as any)?.message
          ? String((err as any).message)
          : "Failed to fetch coins"
      );
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
      setErrorAllCoins(null);
    } catch (err) {
      console.log("Error fetching all coins:", err);
      setErrorAllCoins(
        (err as any)?.message
          ? String((err as any).message)
          : "Failed to fetch more coins"
      );
      setHasMorePages(false);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (errorAllCoins) return;
    if (!isLoadingMore && hasMorePages) {
      fetchAllCoinsData(currentPage + 1, 10);
    }
  };
  useEffect(() => {
    const init = async () => {
      try {
        const resp = await axios.get(
          "https://coingeko.burjx.com/coin-prices-all",
          {
            params: { currency: "usd", page: 1, pageSize: 20 },
          }
        );
        const data = resp.data as CoinsListApiResponse;
        setCoinsList(data.data);
        setError(null);
        setFilteredAllCoinsList(data.data.slice(10));
        setCurrentPage(1);
        setHasMorePages(1 < data.totalPages*2); // Because I am fetching 20 on inital state for the upper horizontal coins(featured) 
        setError(null);
      } catch (err) {
        console.log("Initial fetch error:", err);
        setError(
          (err as any)?.message
            ? String((err as any).message)
            : "Failed to load data"
        );
      }
    };

    init();
  }, []);

  const retry = (allCoins = false) => {
    if (allCoins) {
      setErrorAllCoins(null);
      fetchAllCoinsData(1, 10);
    } else {
      setError(null);
      fetchCoinData();
    }
  };

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
        {error && (
          <View
            style={{
              padding: 10,
              backgroundColor: colors.error,
              margin: 12,
              borderRadius: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", flex: 1 }}>{error}</Text>
              <TouchableOpacity
                onPress={() => retry()}
                style={{ marginLeft: 12 }}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>Retry</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
            renderItem={({ item }) => (
              <CoinCardVerical
                cryptoAsset={item}
                onPress={() => {
                  router.push({
                    pathname:
                      `/(crypto-currencies)/${item.productId}` as RelativePathString,
                    params: {
                      data: JSON.stringify(item),
                    },
                  });
                }}
              />
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderListFooter}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        </View>
        {errorAllCoins && (
          <View
            style={{
              padding: 10,
              backgroundColor: colors.error,
              margin: 12,
              borderRadius: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", flex: 1 }}>{errorAllCoins}</Text>
              <TouchableOpacity
                onPress={() => retry(true)}
                style={{ marginLeft: 12 }}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>Retry</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default CurrenciesList;
