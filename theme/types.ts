import { MD3Theme } from "react-native-paper";
export interface CustomColors {}
export type ThemeColors = MD3Theme["colors"] & CustomColors;

export type AppTheme = MD3Theme & {
  colors: ThemeColors;
};
