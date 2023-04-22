import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";

import stylesItem from "./stylesItem";
import { Image } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

const CurrentOrderModal = ({ visible, onClose, orders }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (orders) {
      setData(orders[0].basketItems);
    }
  }, []);
  console.log(data);
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Current Order</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={stylesItem.container}>
                {item && (
                  <Image
                    source={{ uri: item.dishImgUrl }}
                    style={stylesItem.image}
                  />
                )}
                <View style={{ flex: 1 }}>
                  <Text style={stylesItem.name}>
                    {item ? item.dishName : "Dish Name"}
                  </Text>
                  <Text style={stylesItem.description} numberOfLines={2}>
                    {item ? item.dishDesc : "Dish Description"}
                  </Text>
                  <Text style={styles.price}>
                    ₹{item ? item.dishPrice : "Dish Price"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 8,
                      fontStyle: "italic",
                      fontWeight: 900,
                    }}
                  >
                    from{" "}
                    <Text
                      style={{
                        color: "#f97316",
                        fontSize: 10,
                        fontStyle: "italic",
                        fontWeight: 900,
                      }}
                    >
                      {item ? item.rasoiName : "RasoiName"}
                    </Text>
                  </Text>
                </View>
                <View style={stylesItem.addSubContainer}>
                  <FontAwesome5
                    name="shopping-basket"
                    size={16}
                    color="#f97316"
                  />
                  <Text
                    style={{ fontSize: 18, fontWeight: 700, color: "#f97316" }}
                  >
                    {item.dishCounts}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.dishId}
          />
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CurrentOrderModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    height: "50%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeBtn: {
    backgroundColor: "#f97316",
    borderRadius: 5,
    padding: 10,
  },
  closeBtnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: 500,
    fontSize: 16,
  },
});
