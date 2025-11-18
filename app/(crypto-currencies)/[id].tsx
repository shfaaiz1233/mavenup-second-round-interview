import CurrencyDetails from "@/components/molecules/currencyDetails";
import { useAppTheme } from "@/theme";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CoinDetailsScreen() {
  const { colors } = useAppTheme();
  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <CurrencyDetails />
    </SafeAreaView>
  );
}
