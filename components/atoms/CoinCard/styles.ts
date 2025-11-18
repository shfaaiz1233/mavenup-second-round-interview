import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderColor: "#FFFFFF0D",
    padding: 20,
    borderWidth: 1,
    width: 300,
    height: 300,
    overflow: "hidden",
    position: "relative",
  },
  imageAndTitleAbsolute: {
    position: "absolute",
    top: 15,
    left: 15,
    flexDirection: "row",
    gap: 12,
    zIndex: 10,
    width: "100%",
  },

  imageAndTitle: {
    flexDirection: "row",
    gap: 12,
  },
  percentageBadge: {
    backgroundColor: "#FFFFFF0D",
    borderRadius: 7,
    padding: 4,
    marginLeft: "auto",
    justifyContent: "center",
  },

  percentageText: {
    fontSize: 10,
    fontWeight: "400",
  },

  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 3,
    left: 14,
    padding: 4,
    width: "100%",
  },

  chartWrapper: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    top: 0,
    right: 0,
  },

  priceText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
  },

  symbolText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    textTransform: "capitalize",
  },

  nameText: {
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 18,
    textTransform: "capitalize",
  },
});

export default styles;
