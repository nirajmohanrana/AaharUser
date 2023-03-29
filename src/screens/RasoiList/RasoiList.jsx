import { View } from "react-native";

import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../../../firebaseConfig";
import { FlatList } from "react-native";
import { Text } from "react-native";
import { Image } from "react-native";
import RasoiCard from "./RasoiCard";

function RasoiList() {
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
        data={rasoiUsers}
        renderItem={({ item }) => <RasoiCard rasoi={item} />}
        keyExtractor={(rasoi) => rasoi.id}
      />
    </View>
  );
}

export default RasoiList;
