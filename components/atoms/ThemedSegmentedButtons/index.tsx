import { useAppTheme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";
import { SegmentedControlButtonProps } from "./types";

const ThemedSegmentedButtons: React.FC<SegmentedControlButtonProps> = ({
  values,
  selectedValue,
  setSelectedValue,
  disabled = false,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { borderColor: colors.outline }]}>
      {values.map((item) => {
        const isSelected = item.value === selectedValue;

        return (
          <TouchableOpacity
            key={item.value}
            style={styles.button}
            onPress={() => setSelectedValue(item.value)}
            disabled={disabled}
          >
            <View style={styles.inner}>
              {item.icon && (
                <Feather
                  name={item.icon}
                  size={16}
                  color={colors.onBackground}
                />
              )}
              <Text
                style={[
                  styles.label,
                  {
                    fontWeight: isSelected ? "700" : "400",
                    color: colors.onBackground,
                  },
                ]}
              >
                {item.label}
              </Text>
            </View>

            <View style={[styles.underline, { backgroundColor: colors.surface }]} />

            {isSelected && (
              <View
                style={[
                  styles.underline,
                  styles.selectedUnderline,
                  { backgroundColor: colors.primary },
                ]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ThemedSegmentedButtons;
