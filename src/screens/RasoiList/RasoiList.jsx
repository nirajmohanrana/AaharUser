import { View, FlatList } from "react-native";

import { useEffect, useState } from "react";

import RasoiCard from "./RasoiCard";

import firestore from "@react-native-firebase/firestore";

function RasoiList({ navigation }) {
  const [rasoiUsers, setRasoiUsers] = useState(null);

  const rasoiUserRef = firestore().collection("rasoi-users");

  useEffect(() => {
    const unsubscribe = rasoiUserRef.onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const rasoiUsersTemp = [];

        querySnapshot.forEach((user) => {
          rasoiUsersTemp.push(user.data());
        });

        setRasoiUsers(rasoiUsersTemp);
      },
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      <FlatList
        style={{ padding: 15 }}
        data={rasoiUsers}
        renderItem={({ item }) => (
          <RasoiCard rasoi={item} navigation={navigation} />
        )}
        keyExtractor={(rasoi) => rasoi.rasoiId}
        ListFooterComponent={() => <View style={{ height: 100 }} />}
      />
    </View>
  );
}

export default RasoiList;
