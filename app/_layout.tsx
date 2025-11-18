import { customTheme } from "@/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(crypto-currencies)",
};

export default function RootLayout() {
  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/OpenSans-VariableFont.ttf"),
  });

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={customTheme}>
        <Stack>
          <Stack.Screen name="(crypto-currencies)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="light" />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
