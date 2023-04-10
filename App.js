import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { Provider } from "react-redux";
import store from "./src/store/store";

import TabNavigators from "./src/navigations/TabNavigators";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";

import Login from "./src/screens/Login/Login";

import auth from "@react-native-firebase/auth";

import "expo-dev-client";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  function onAuthStateChanged(user) {
    setCurrentUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log("currentUser", currentUser);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Provider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : -64}
        style={{ flex: 1 }}
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={currentUser ? "Aahar" : "Login"}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Aahar" component={TabNavigators} />
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </Provider>
  );
}
