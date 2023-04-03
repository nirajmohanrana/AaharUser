import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { useSelector } from "react-redux";
import BasketItem from "./BasketItem";
import { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

function Basket({ navigation }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const basketItems = useSelector((state) => {
    return state.basket;
  });

  useEffect(() => {
    let newTotal = 0;
    basketItems.forEach((basketItem) => {
      newTotal += basketItem.dishCounts * basketItem.dishPrice;
    });

    setTotalPrice(newTotal);
  }, [basketItems]);

  return (
    <>
      <View style={{ height: "88%" }}>
        {basketItems.length > 0 ? (
          <>
            <View style={styles.totalCon}>
              <Text style={{ fontSize: 16 }}>Total</Text>
              <Text style={{ fontSize: 18, fontWeight: 900, color: "#f97316" }}>
                ₹ {totalPrice}
              </Text>
            </View>
            <FlatList
              data={basketItems}
              renderItem={({ item }) => <BasketItem dish={item} />}
              keyExtractor={(index) => {
                index;
              }}
              ListFooterComponent={() => <View style={{ height: 100 }} />}
            />
          </>
        ) : (
          ""
        )}
      </View>
      <View style={styles.bottomBtns}>
        <TouchableOpacity
          style={styles.resIcon}
          onPress={() => {
            navigation.navigate("Rasoi Ghar");
          }}
        >
          <Ionicons name="restaurant" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.payBtn,
            { backgroundColor: basketItems.length === 0 ? "gray" : "#000" },
          ]}
          disabled={basketItems.length === 0 ? false : true}
        >
          <Text style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>
            Proceed To Pay
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Basket;

const styles = StyleSheet.create({
  totalCon: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingBottom: 5,
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "baseline",
    borderBottomWidth: 0.5,
  },
  bottomBtns: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
    paddingHorizontal: 20,
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
  },
});
