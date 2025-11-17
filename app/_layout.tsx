import { customTheme } from "@/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(main)",
};

export default function RootLayout() {
  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/OpenSans-VariableFont.ttf"),
  });

  if (!loaded) return null;

  return (
    <PaperProvider theme={customTheme}>
      <Stack>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </PaperProvider>
  );
}
