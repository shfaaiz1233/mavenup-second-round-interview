import { MD3LightTheme, useTheme } from "react-native-paper";
import { AppTheme, CustomColors } from "./types";
const fontFamily = "OpenSans";
const typescale = {
  displayLarge: { fontFamily },
  displayMedium: { fontFamily },
  displaySmall: { fontFamily },
  headlineLarge: { fontFamily },
  headlineMedium: { fontFamily },
  headlineSmall: { fontFamily },
  titleLarge: { fontFamily },
  titleMedium: { fontFamily },
  titleSmall: { fontFamily },
  labelLarge: { fontFamily },
  labelMedium: { fontFamily },
  labelSmall: { fontFamily },
  bodyLarge: { fontFamily },
  bodyMedium: { fontFamily },
  bodySmall: { fontFamily },
};
const customColors: CustomColors = {};

export const customTheme = {
  ...MD3LightTheme,
  roundness: 4,
  colors: {
    ...MD3LightTheme.colors,
    ...customColors,
    primary: "#CDFF00",
    background: "#000000",
    onPrimary: "#000000",
    onBackground: "#FFFFFF",
    surface: "#2B2B2B",
    onSurface: "#FFFFFF",
    error: "#FF3440"
  },
  fonts: typescale,
};

export const useAppTheme = () => {
  return useTheme<AppTheme>(customTheme);
};
