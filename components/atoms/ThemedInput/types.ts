import { KeyboardType, KeyboardTypeOptions } from "react-native";
import { TextInputProps } from "react-native-paper";

interface ThemedInputProps {
  onChange: (text: string) => void;
  onBlur?: () => void;
  value: string;
  keyboardType: KeyboardType | KeyboardTypeOptions;
  autoCompleteType?: TextInputProps["autoComplete"];
  errors?: string;
  inputLabel?: string;
  required?: boolean;
  accessibilityLabel: string;
  accessibilityHint: string;
  secureTextEntry?: boolean;
  maxLength?: number;
  right?: React.ReactNode;
  left?: React.ReactNode;
  placeHolder?: string;
  disabled?: boolean;
  onPress?: () => void;
  height?: number;
  isPressable?: boolean;
  multiline?: boolean;
}

export default ThemedInputProps;
