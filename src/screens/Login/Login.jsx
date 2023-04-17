import { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthScreen from "./AuthScreen";

import auth from "@react-native-firebase/auth";

function Login({ navigation }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(user);
    if (user) {
      navigation.navigate("Main");
    }

    return subscriber;
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <AuthScreen navigation={navigation} />
    </SafeAreaView>
  );
}

export default Login;
