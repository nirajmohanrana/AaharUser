import { Image, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./AuthScreen";
import AddDetails from "./AddDetails";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

function Login() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.logoCon}>
        <Image
          source={require("../../../assets/adaptive-icon.png")}
          style={styles.logo}
        />
      </View>
      <View style={{ flex: 1 }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  logoCon: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default Login;
