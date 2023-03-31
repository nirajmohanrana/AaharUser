import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

function BasketBadge() {
  const basketLength = useSelector((state) => {
    return state.basket.length;
  });

  return (
    <>
      {basketLength > 0 ? (
        <View
          style={{
            position: "absolute",
            borderRadius: 50,
            width: 15,
            height: 15,
            right: -8,
            top: -5,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f97316",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: 10,
            }}
          >
            {basketLength}
          </Text>
        </View>
      ) : (
        ""
      )}
    </>
  );
}
export default BasketBadge;
