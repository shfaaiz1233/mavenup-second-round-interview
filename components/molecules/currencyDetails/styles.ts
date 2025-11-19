import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  coinHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    alignSelf: "flex-start",
  },
  iconAndTitle: { flexDirection: "row", alignItems: "center", gap: 10 },
  cryptoTitleText: {
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
  },
  currentPriceText: {
    fontWeight: "400",
    fontSize: 32,
    lineHeight: 48,
    marginVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 500,
  },
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
    alignItems: "center",
    width: 80,
  },

  percentageText: {
    fontSize: 10,
    fontWeight: "400",
  },
});
export default styles;
