import { useAppTheme } from "@/theme";
import React, { useState } from "react";
import { Platform, TouchableWithoutFeedback, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import createStyles from "./styles";
import ThemedInputProps from "./types";
const ThemedInput = ({
  inputLabel,
  placeHolder = "",
  required = false,
  onBlur,
  onChange,
  value,
  keyboardType,
  autoCompleteType,
  accessibilityLabel,
  accessibilityHint,
  maxLength,
  errors,
  right,
  left,
  secureTextEntry = false,
  disabled,
  height = 55,
  onPress,
  isPressable = false,
  multiline = false,
}: Readonly<ThemedInputProps>) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [inputHeight, setInputHeight] = useState(height);

  const renderInput = () => (
    <TextInput
      multiline={multiline}
      onContentSizeChange={(e) => {
        if (e.nativeEvent.contentSize.height > 126) return;
        setInputHeight(e.nativeEvent.contentSize.height);
      }}
      onPress={onPress}
      disabled={disabled}
      mode="outlined"
      placeholder={placeHolder}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      keyboardType={keyboardType}
      autoCapitalize="none"
      autoComplete={autoCompleteType}
      maxLength={maxLength}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      secureTextEntry={secureTextEntry}
      left={left}
      right={right}
      placeholderTextColor={colors.onSurface}
      style={[
        styles.inputText,
        {
          direction: 'rtl',
          backgroundColor:
            disabled && !isPressable
              ? "transparent"
              : value.length > 0
              ? colors.background
              : colors.primary,
        },
        { height: multiline ? inputHeight : height },
      ]}
      contentStyle={[
        styles.inputContent,
        { height: multiline ? inputHeight : height },
      ]}
      outlineColor={colors.primary as string}
      activeOutlineColor={colors.onPrimary as string}
      selectionColor={"#6D6D6D" as string}
      theme={{
        colors: {
          placeholder: colors.onSurface,
          background: colors.primary as string,
          text: colors.onPrimary as string,
          primary: colors.primary as string,
        },
        roundness: 10,
      }}
    />
  );

  return (
    <View style={styles.container}>
      {/* {!!inputLabel && <Text style={styles.inputLabel}>{inputLabel}</Text>} */}
      {!!inputLabel && (
        <Text style={styles.inputLabel}>
          {inputLabel}
          {required && <Text style={{ color: "red" }}> *</Text>}
        </Text>
      )}

      {/* OnPress on TextInput doesn't work properly on IOS so below is implementation */}
      {onPress && disabled && Platform.OS === "android" ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <View>{renderInput()}</View>
        </TouchableWithoutFeedback>
      ) : (
        renderInput()
      )}

      {errors && (
        <Text style={[styles.errorText, { color: colors.error as string }]}>
          {errors}
        </Text>
      )}
    </View>
  );
};

export default ThemedInput;
