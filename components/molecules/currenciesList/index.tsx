import { useAppTheme } from "@/theme";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const CurrenciesList = () => {
  const { colors } = useAppTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: colors.primary }}>CurrenciesList</Text>
    </View>
  );
};

export default CurrenciesList;
