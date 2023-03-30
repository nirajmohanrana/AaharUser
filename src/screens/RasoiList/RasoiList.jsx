import { View, FlatList } from "react-native";

import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../../../firebaseConfig";
import RasoiCard from "./RasoiCard";

function RasoiList({ navigation }) {
  const [rasoiUsers, setRasoiUsers] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "rasoi-users"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = [];

      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });

      setRasoiUsers(usersData);
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <FlatList
        style={{ padding: 15 }}
        data={rasoiUsers}
        renderItem={({ item }) => (
          <RasoiCard rasoi={item} navigation={navigation} />
        )}
        keyExtractor={(rasoi) => rasoi.id}
      />
    </View>
  );
}

export default RasoiList;
