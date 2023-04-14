import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { Provider } from "react-redux";
import store from "./src/store/store";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigators from "./src/navigations/TabNavigators";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";

import "expo-dev-client";
import Login from "./src/screens/Login/Login";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : -64}
        style={{ flex: 1 }}
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Main" component={TabNavigators} />
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </Provider>
  );
}
