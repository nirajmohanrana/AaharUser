import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";

import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

import RasoiHeader from "./RasoiHeader";
import DishItem from "./DishItem";

function RasoiDetails() {
  const [rasoi, setRasoi] = useState(null);
  const [food, setFood] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "rasoi-users"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = [];

      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });

      setRasoi(usersData[0]);
    });

    const q1 = query(collection(db, "food-items"));

    const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
      const foodsData = [];

      querySnapshot.forEach((doc) => {
        foodsData.push({ id: doc.id, ...doc.data() });
      });

      setFood(foodsData[0].foods);
    });

    return () => {
      unsubscribe();
      unsubscribe1();
    };
  }, []);

  console.log(food);

  return (
    <View>
      <FlatList
        ListHeaderComponent={() => <RasoiHeader rasoi={rasoi} />}
        data={food}
        renderItem={({ item }) => <DishItem dish={item} />}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

export default RasoiDetails;
