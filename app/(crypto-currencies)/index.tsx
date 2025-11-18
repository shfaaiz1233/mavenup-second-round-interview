import CurrenciesList from "@/components/molecules/currenciesList";
import { useAppTheme } from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { colors } = useAppTheme();
  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <CurrenciesList />
    </SafeAreaView>
  );
}
