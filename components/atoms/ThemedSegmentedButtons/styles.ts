import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontSize: 14,
  },
  icon: {
    fontSize: 16,
  },
  underline: {
    height: 3,
    marginTop: 4,
    alignSelf: "stretch",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  selectedUnderline: {
    position: "absolute",
    bottom: 0,
    left: 10,
    right: 10,
    borderRadius: 999,
  },
});

export default styles;
