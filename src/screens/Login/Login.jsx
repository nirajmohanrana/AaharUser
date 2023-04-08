import { useState } from "react";
import { Image, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AddDetails from "./AddDetails";
import AuthScreen from "./AuthScreen";

const Stack = createNativeStackNavigator();

function Login() {
  const [logo, setLogo] = useState(
    require("../../../assets/adaptive-icon.png")
  );

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", marginTop: "30%" }}
    >
      <View style={styles.logoCon}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={{ flex: 1, height: "80%" }}>
        <Stack.Navigator>
          <Stack.Screen
            name="AuthScreen"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddDetails"
            component={AddDetails}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoCon: {
    justifyContent: "center",
    alignItems: "center",
    height: "20%",
  },
  logo: {
    width: 250,
    height: 250,
  },
});

export default Login;
