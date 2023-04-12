import { useState } from "react";
import { Image, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthScreen from "./AuthScreen";

function Login() {
  const [logo, setLogo] = useState(
    require("../../../assets/adaptive-icon.png")
  );

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <AuthScreen />
    </SafeAreaView>
  );
}

export default Login;
