import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import RasoiHeader from "./RasoiHeader";
import DishItem from "./DishItem";

import firestore from "@react-native-firebase/firestore";

function RasoiDetails({ route }) {
  const [food, setFood] = useState(null);

  const rasoiUserRef = firestore().collection("rasoi-users");
  const foodItemsRef = rasoiUserRef
    .doc(route.params.rasoi.rasoiId)
    .collection("food-items");

  useEffect(() => {
    const unsubscribe = foodItemsRef.onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const foodItemsTemp = [];

        querySnapshot.forEach((food) => {
          foodItemsTemp.push(food.data());
        });

        console.log(foodItemsTemp);
        setFood(foodItemsTemp);
      },
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      <FlatList
        ListHeaderComponent={() => <RasoiHeader rasoi={route.params.rasoi} />}
        data={food}
        renderItem={({ item }) => (
          <DishItem
            dish={item}
            rasoiName={route.params.rasoi.rasoiName}
            rasoiId={route.params.rasoi.rasoiId}
          />
        )}
        ListFooterComponent={() => <View style={{ height: 100 }} />}
        keyExtractor={(food) => food.foodId}
      />
    </View>
  );
}

export default RasoiDetails;
