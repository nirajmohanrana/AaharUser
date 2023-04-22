import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingVertical: 5,
    marginVertical: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 5,
    letterSpacing: 0.5,
  },
  description: {
    color: "gray",
    marginTop: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: 700,
  },
  image: {
    height: 60,
    aspectRatio: 1,
    marginHorizontal: 8,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#f97316",
  },
  addSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginRight: 4,
  },
});
