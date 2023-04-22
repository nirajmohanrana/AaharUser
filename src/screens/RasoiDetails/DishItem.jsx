import { useEffect, useState } from "react";

import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, Pressable, View, Image } from "react-native";

import { addDish, removeDish } from "../../store/slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";

function DishItem({ dish, rasoiName, rasoiId }) {
  const [dishCount, setDishCount] = useState(0);

  const dispatch = useDispatch();

  function handleAdd() {
    setDishCount(dishCount + 1);

    const item = {
      dishId: dish.foodId,
      dishName: dish.dishName,
      dishImgUrl: dish.dishImgUrl,
      dishDesc: dish.dishDesc,
      dishPrice: dish.dishPrice,
      rasoiName: rasoiName,
      rasoiId: rasoiId,
      dishCounts: dishCount + 1,
    };

    dispatch(addDish(item));
  }

  function handleSub() {
    if (dishCount > 0) {
      setDishCount(dishCount - 1);

      const item = {
        dishId: dish.foodId,
        dishName: dish.dishName,
        dishImgUrl: dish.dishImgUrl,
        dishDesc: dish.dishDesc,
        dishPrice: dish.dishPrice,
        dishCounts: dishCount - 1,
      };

      dispatch(removeDish(item));
    }
  }

  const basketItems = useSelector((state) => state.basket);

  useEffect(() => {
    const basketItem = basketItems.find(
      (item) => item.dishName === dish.dishName
    );

    if (basketItem) {
      setDishCount(basketItem.dishCounts);
      console.log(basketItem.dishCounts);
    }
  }, [basketItems, dish]);

  return (
    <Pressable style={styles.container}>
      {dish && <Image source={{ uri: dish.dishImgUrl }} style={styles.image} />}
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{dish ? dish.dishName : ""}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {dish ? dish.dishDesc : ""}
        </Text>
        <Text style={styles.price}>₹{dish ? dish.dishPrice : ""}</Text>
      </View>
      <View style={styles.addSubContainer}>
        <View style={styles.addSub}>
          <Pressable
            onPress={handleSub}
            style={{ borderRightWidth: 1, borderColor: "#f97316" }}
          >
            <Feather name="minus" size={22} color="#f97316" />
          </Pressable>
          <View
            style={{
              width: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{dishCount}</Text>
          </View>
          <Pressable
            onPress={handleAdd}
            style={{ borderLeftWidth: 1, borderColor: "#f97316" }}
          >
            <Feather name="plus" size={22} color="#f97316" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 20,
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
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
  },
  image: {
    height: 75,
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
  },
  addSub: {
    borderWidth: 1,
    borderColor: "#f97316",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DishItem;
