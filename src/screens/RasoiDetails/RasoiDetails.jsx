import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

import RasoiHeader from "./RasoiHeader";
import DishItem from "./DishItem";

function RasoiDetails({ route }) {
  const [food, setFood] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "food-items", route.params.rasoi.id),
      (doc) => {
        const docData = doc.data();
        setFood(docData.foods);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [route.params.rasoi]);

  return (
    <View>
      <FlatList
        ListHeaderComponent={() => <RasoiHeader rasoi={route.params.rasoi} />}
        data={food}
        renderItem={({ item }) => (
          <DishItem dish={item} rasoiName={route.params.rasoi.rasoiName} />
        )}
        keyExtractor={(food) => food.foodId}
      />
    </View>
  );
}

export default RasoiDetails;
