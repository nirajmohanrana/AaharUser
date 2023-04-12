import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { Provider } from "react-redux";
import store from "./src/store/store";

import TabNavigators from "./src/navigations/TabNavigators";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";

import "expo-dev-client";

import firebase from "@react-native-firebase/app";

export default function App() {
  return (
    <Provider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : -64}
        style={{ flex: 1 }}
      >
        <NavigationContainer>
          <TabNavigators />
        </NavigationContainer>
      </KeyboardAvoidingView>
    </Provider>
  );
}
