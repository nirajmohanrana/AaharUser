import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import store from "./src/store/store";

import TabNavigators from "./src/navigations/TabNavigators";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login/Login";
import "expo-dev-client";

export default function App() {
  const Stack = createNativeStackNavigator();
  const user = false;
  return (
    <Provider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : -64}
        style={{ flex: 1 }}
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={user ? "Aahar" : "Login"}
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
