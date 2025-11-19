import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  timeframeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  timeframeButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  timeframeText: {
    fontSize: 14,
    fontWeight: "600",
  },
   percentageBadge: {
    backgroundColor: "#FFFFFF0D",
    borderRadius: 7,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: 'center',
    width: 80
  },

  percentageText: {
    fontSize: 10,
    fontWeight: "400",
  },
});
export default styles;
