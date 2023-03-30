import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  page: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  image: {
    width: Dimensions.get("window").width,
    height: 250,
    aspectRatio: 5 / 3,
    position: "relative",
  },
  logo: {
    width: 85,
    height: 85,
    margin: 15,
    position: "absolute",
    bottom: 0,
    borderRadius: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 5,
    color: "#f97316",
  },
  menuTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: "#f97316",
  },
  subtitle: {
    fontSize: 15,
    color: "#525252",
  },
  container: {
    margin: 10,
  },
});
