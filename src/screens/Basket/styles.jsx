import { StyleSheet } from "react-native";

export default StyleSheet.create({
  totalCon: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "baseline",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
  },
  bottomBtns: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
    marginHorizontal: 15,
  },
  resIcon: {
    backgroundColor: "#f97316",
    padding: 10,
    borderRadius: 1000,
    elevation: 5,
  },
  payBtn: {
    borderRadius: 30,
    height: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  emptyBasketCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 700,
  },
  emptySubitle: {
    fontWeight: 300,
  },
  optionButton: {
    width: "45%",
    padding: 10,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  selectedOptionButton: {
    backgroundColor: "#f97316",
  },
  optionButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
  selectedOptionButtonText: {
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    marginVertical: 10,
    backgroundColor: "#fff",
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    borderRadius: 15,
  },
});
