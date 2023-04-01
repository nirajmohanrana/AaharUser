import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import store from "./src/store/store";

import TabNavigators from "./src/navigations/TabNavigators";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigators />
      </NavigationContainer>
    </Provider>
  );
}
