import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function HomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <Text>Hello world</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }
});
