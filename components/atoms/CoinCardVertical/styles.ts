import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderColor: "#FFFFFF0D",
    padding: 20,
    borderWidth: 1,
    height: 250,
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
    alignItems: "center",
  },

  percentageContainer: {
    backgroundColor: "#FFFFFF0D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    padding: 4,
    marginLeft: "auto",
  },

  percentageText: {
    fontSize: 10,
    fontWeight: "400",
  },

  chartContainerAbsolute: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    top: 0,
    right: 0,
    width: "100%",
  },

  priceTextAbsolute: {
    position: "absolute",
    bottom: 3,
    left: 14,
    padding: 4,
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
