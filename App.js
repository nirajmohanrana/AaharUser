import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import store from "./src/store/store";

import TabNavigators from "./src/navigations/TabNavigators";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        style={{ flex: 1 }}
      >
        <NavigationContainer>
          <TabNavigators />
        </NavigationContainer>
      </KeyboardAvoidingView>
    </Provider>
  );
}
