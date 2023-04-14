import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import RasoiHeader from "./RasoiHeader";
import DishItem from "./DishItem";

import firestore from "@react-native-firebase/firestore";

function RasoiDetails({ route }) {
  const [food, setFood] = useState(null);

  const foodRef = firestore().collection("food-items");

  useEffect(() => {
    // console.log("RASOI ID", route.params.rasoi.rasoiId);

    console.log(foodRef.get());

    const unsubscribe = foodRef.onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        querySnapshot.forEach((user) => {
          // console.log(user.data());
        });
      },
    });

    return () => {
      unsubscribe();
    };

    // const unsubscribe = onSnapshot(
    //   doc(db, "food-items", route.params.rasoi.id),
    //   (doc) => {
    //     const docData = doc.data();
    //     setFood(docData.foods);
    //   }
    // );
    // return () => {
    //   unsubscribe();
    // };
  }, [route.params.rasoi]);

  return (
    <View>
      <FlatList
        ListHeaderComponent={() => <RasoiHeader rasoi={route.params.rasoi} />}
        data={food}
        renderItem={({ item }) => (
          <DishItem dish={item} rasoiName={route.params.rasoi.rasoiName} />
        )}
        ListFooterComponent={() => <View style={{ height: 100 }} />}
        keyExtractor={(food) => food.foodId}
      />
    </View>
  );
}

export default RasoiDetails;
